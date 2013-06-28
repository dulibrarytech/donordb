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
		// TODO: case select; get post data; send to model search function; json encode and echo results (array)
	}

	public function browseDonors() 
	{
		$data['pageLoader'] = "<script>browseDonorsView.initPage();</script>";

		$this->load->view('table-view', $data);
	}

	public function queryDatabaseAllDonors()
	{
		echo json_encode($this->searchModel->browseAllDonors());
	}

	public function titleList()
	{
		// $resultViewData['resultsTable'] = $this->titleModel->createTitleTable();

		// $this->load->view('title-list', $resultViewData);
	}
}