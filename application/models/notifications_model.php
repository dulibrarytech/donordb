<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');


/*
 * Donor Application
 *
 * Notifications Model (Mailout functions) 
 *
 * Author: Jeff Rynhart
 * 
 * University of Denver, September 2013
 */
class Notifications_model extends CI_Model
{
    function __construct() 
    {
        $this->load->helper('date');
        $this->load->library('email');
        $this->load->database();

        // $config['mailpath']     = '';
        // $config['protocol']     = 'smtp';
        // $config['']
    }

    /*
     * Send donation notification to users of specified role 
     *
     */
    public function sendDonationUpdate($newDonations,$roleID)
    {
        $subject = "New Donation Update";

        $body = "*** Please do not reply to this message ***<br /><br />";
    	$body .= "New donations as of " . getCurrentDate() . ":<br /><br /><br />";
    	
    	if(gettype($newDonations) != 'string')
    	{
            foreach($newDonations as $donation)
	    	{
                $body .= $donation['giftDate'] . "&nbsp&nbsp&nbsp&nbsp";

                if($donation['lastName'] == "" || $donation['lastName'] == null)
                    $body .= $donation['org'] . "<br />";
                else
                    $body .= $donation['firstName'] . " " . $donation['lastName'] . "<br />";
	    	}
    	} 
    	else
    	{
    		$body .= $newDonations . "<br />";
    	}

    	$body .= "<br /><br />";
    	$body .= "<a href='" . base_url() . "'>Login to Application</a>";

    	// Get list of email addresses for specified role
        $emailList = array();
        if($roleID != null)
        {
            $this->db->select('email');
            $this->db->from('tbl_donorusers');
            $this->db->where('roleID',$roleID);

            $query = $this->db->get();

            foreach ($query->result() as $result)
            {
                array_push($emailList, $result->email);
            }
        }
       
    	foreach($emailList as $address)  
    	{
            log_message('info', 'notification sent to: ' . $address);
			// $this->email->from('|5');
   //          $this->email->to($address);
   //          $this->email->subject("New Library Donation Update");
   //          $this->email->message($body);
   //          $this->email->send();
    	}
    }
}