<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/*
 * Donor Application
 *
 * loginModel - LDAP/AD access; usersModel access
 *
 * Author: Jeff Rynhart
 * 
 * University of Denver, August 2013
 */

class loginModel extends CI_Model 
{
    public function __construct() 
    {
        parent::__construct();
    }

    /**
     * @param string $userName
     * @return int userID if valid, 0 if invalid 
     */
    public function authenticate($login) 
    {
    	if (!is_array($login) || empty($login)) 
    	{
            return header("HTTP/1.1 404 Not Found");
        }

        $userName = strip_tags(trim($login["userName"]));
        $passWord = strip_tags(trim($login["passWord"]));
        $profile  = array('isValid' => FALSE, 'userName' => $userName);
        $remoteAuth = TRUE;                                                                                 // *************   BYPASSED!  Set to FALSE
    
        // Detect ldap and ad usernames
        if (ctype_digit($userName)) 
        {
            try 
            {   
                $this->load->library("auth/Ldap");
                $remoteAuth = (boolean)$this->ldap->authenticate($userName, $passWord);
                log_message("info", "ldap login validated: " . $userName );
            } 
            catch(Exception $e) 
            {
                log_message("error", $e->getMessage());
            }
        } 
        else 
        {
            try 
            {    
                $this->load->library("auth/ActiveDirectory");
                $remoteAuth = (boolean)$this->activedirectory->authenticate($userName, $passWord);
                log_message("info", "ad login validated: " . $userName);
            } 
            catch (Exception $e) 
            {
                log_message("error", $e->getMessage());
            }     
        }

        // Check login against donorDB user table.  If login is valid, set user session profile
        if($remoteAuth == TRUE)
        {
            $this->load->model("usersModel");
            $id = $this->usersModel->validateUser($userName);
            
            if($id > 0)
            {
                $profile = $this->usersModel->getProfile($id);
                log_message("info", "donorDB login validated: " . $userName);

                if ($profile["isValid"] == TRUE) // *returns $profile['isValid'] == FALSE if not valid, not a null array
                {
                    $this->phpsessions->set("donorDB_profile", $profile);
                    log_message("info", "donorDB session created: " . $userName);
                }
            }
            else
            {
                log_message("info", "donorDB login refused: " . $userName);
            }
        }

        return $profile;
    }
}