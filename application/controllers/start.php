<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');


/*
 * Donor Application
 *
 * Entry point controller for the App.
 * 
 * Purpose: Special controller that does not call a session check.  Loads the homepage upon initial entry, regardless of an established session.
 *
 * Author: Jeff Rynhart
 * 
 * University of Denver, June 2013
 */
class start extends CI_Controller {

    function __construct() 
    {
        parent::__construct();
    }

    /*
	 * Load Search View with no user session established.
	 */
	public function index()
	{
		$data['pageLoader'] = "<script>authentication.validateSession();</script>";

		$this->load->view('lookup-view', $data);
	}
}