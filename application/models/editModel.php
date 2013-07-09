<?php
/*
 * Donor Application
 *
 * editModel - functions related to data entry
 *
 * Author: Jeff Rynhart
 * 
 * University of Denver, July 2013
 */
 
class editModel extends CI_Model 
{

	function __construct() 
    {
        parent::__construct();
        $this->load->database();
    }

    public function createDonorRecord($newDonorData)
    {
    	
    }

} // editModel