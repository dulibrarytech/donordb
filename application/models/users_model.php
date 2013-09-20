<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/*
 * Donor Application
 *
 * Users_model - Interface with user database table
 *
 * Author: Jeff Rynhart
 * 
 * University of Denver, August 2013
 */

class Users_model extends CI_Model 
{
    public function __construct() 
    {
        parent::__construct();
        $this->load->database();
    }

    /**
     * @param string $userName
     * @return int userID if valid, 0 if invalid 
     */
    public function validateUser($userName)
    {
    	$id = 0;

    	$this->db->trans_start();
    	$this->db->select('userID','username');
    	$this->db->from('tbl_donorusers');
    	$this->db->where('username', $userName);
    	$query = $this->db->get();
    	$this->db->trans_complete();

    	if ($query->num_rows() > 0)
     	{
			foreach ($query->result() as $results)
      		{
      			$id = $results->userID;
      		}
     	}

     	return $id; 
    }

    /**
     * @param int donor userID
     * @return array (user profile)
     *
     * There should only be one entry per userID in the database.  If more than one entry is present, function returns the last one found.
     */
    public function getProfile($id)
    {
    	$profile = array('isValid' => FALSE);

    	$this->db->trans_start();
		$this->db->select();
		$this->db->from('tbl_donorusers');
		$this->db->where('userID', $id);
		$query = $this->db->get();
    	$this->db->trans_complete();

    	if($this->db->trans_status() === FALSE)
    	{
    		log_message("error", "Unable to retrieve profile");
    	}
    	else
    	{
    		if ($query->num_rows() > 0)
     		{
				foreach ($query->result() as $results)
      			{
      				$profile['isValid'] = TRUE;

      				$profile['userID'] = (int)$results->userID;
      				$profile['userName'] = $results->username;
      				$profile['roleID'] = (int)$results->roleID;
      				$profile['firstName'] = $results->firstname;
      				$profile['lastName'] = $results->lastname;
      				$profile['email'] = $results->email;
      			}
     		}
     		else
     			log_message("error", "No user data found");
    	}

    	return $profile;
    }
}