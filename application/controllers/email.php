<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');


/*
 * Donor Application
 *
 * Email functions
 *
 * Author: Jeff Rynhart
 * 
 * University of Denver, September 2013
 */
class Email extends CI_Controller {

    function __construct() 
    {
        parent::__construct();

        $this->load->helper('email');
        $this->load->helper('date');
        $this->load->model('Search_model');
    }

    /*
     * Send new donation notifications to Admin user 
     *
     */
    public function sendAdminNotification()
    {
    	$subject = "New Donation Update";
    	$body = "New donations as of " . getCurrentDate() . "\\n\\r";

    	// Construct list and email body
    	$newDonations = $this->Search_model->getAllNewDonations();
    	
    	if(gettype($newDonations) != 'string')
    	{
    		foreach($newDonations as $donation)
	    	{
	    		$body += $donation['giftDate'] . " " . $donation['org'] . " " . $donation['firstName'] . " " . $donation['lastName'] . "\\n\\r";
	    	}
    	} 
    	else
    	{
    		$body += $newDonations . "\\n\\r";
    	}

    	$body += "\\n\\r";
    	$body += "<a href='#'>Login to Application</a>";

    	// Send notification email
    	$emailList = $this->Search_model->getEmailAddressList(2); // Role 2 admin
    	foreach($emailList as $address) 
    	{
    		if(valid_email($address))
    		{
    			send_email($address,$subject,$body);
    		}
    	}
    }

	/*
     * Send current typed letter request notifications to External Relations user 
     *
     */
    public function sendExternalRelationsNotification()
    {
        $subject = "Typed Letter Request for Library Donation";
        $body = "\\n\\r";

        // Construct list and email body
        $requests = $this->Search_model->getAllTypedLetterRequests();
        
        if(gettype($requests) != 'string')
        {
            foreach($requests as $request)
            {
                $body += $request['giftDate'] . " " . $request['org'] . " " . $request['firstName'] . " " . $request['lastName'] . "\\n\\r";
            }
        } 
        else
        {
            $body += $requests . "\\n\\r";
        }

        $body += "\\n\\r";
        $body += "<a href='#'>Login to Application</a>";

        // Send notification email
        $emailList = $this->Search_model->getEmailAddressList(3); // Role 3 external
        foreach($emailList as $address) 
        {
            if(valid_email($address))
            {
                send_email($address,$subject,$body);
            }
        }
    }
}