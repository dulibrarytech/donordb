<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class search extends CI_Controller {

/*
 * Donor Application
 *
 * Search and display functions
 *
 * Author: Jeff Rynhart
 * 
 * University of Denver, May 2013
 */
    function __construct() 
    {
        parent::__construct();
        $this->load->helper('url');
		$this->load->model('searchModel');
    }

	public function index()
	{
		// TODO: any necessary initial security measures

		$data['pageLoader'] = "<script>searchView.initPage();</script>";

		$this->load->view('lookup-view', $data);
	}

	public function recordSearch()
	{
		// TODO: case select; get post data; send to model search function; json encode and echo results 
	}

	public function browseDonors() 
	{
		// TODO: get results table and echo the json encode

		//$resultViewData['resultsTable'] = $this->searchModel->browseAllDonors();
		//$this->load->view('browse-donors'); 
	}

	public function queryDatabaseAllDonors()
	{
		echo json_encode($this->searchModel->browseAllDonors());
	}
}