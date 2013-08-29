<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class loginModel extends CI_Model 
{
    public function __construct() 
    {
        parent::__construct();

        // $this->load->library("encryption/encrypt");
        // $this->salt = $this->config->item("encryption_key");
        // $this->load->driver('cache', array('adapter' => 'apc'));
    }

    public function authenticate($post) 
    {
    	if (!is_array($post) || empty($post)) 
    	{
            return header("HTTP/1.1 404 Not Found");
        }

        $userName = strip_tags(trim($post["userName"]));
        $passWord = strip_tags(trim($post["passWord"]));
        $profile  = array('isValid' => FALSE);
        $remoteAuth = FALSE;
    
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
            $profile = $this->usersModel->get(NULL, $userName);

            // if ($profile["isValid"] == TRUE) // *returns $profile['isValid'] == FALSE if not valid, not a null array
            // {
            //     $this->phpsessions->set("donorDB_profile", $profile);
            //     log_message("info", "donorDB login validated: " . $userName);
            // }
            // else
            //     log_message("info", "donorDB login refused: " . $userName);
        }

        return $profile;
    }
}