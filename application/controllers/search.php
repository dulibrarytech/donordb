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
		$this->load->view('search-form');
	}

	public function donorSearch()
	{
		$keyword = $this->input->get('keyword');
		
		$resultViewData['resultsTable'] 		= /*$this->searchModel->keywordSearch($keyword)*/$keyword;
		// //$resultViewData['resultsTableHeader']	= '<thead><tr><th><!--EMPTY--></th><th>First Name</th><th>Last Name</th><th><!--EMPTY--></th></tr></thead>';
	 	$resultViewData['searchType']  			= /* *** Add var if first/last name can be specified for search *** */ "Name Search Results:"; 		

		$this->load->view('search-results', $resultViewData); 
	}

	public function dateSearch()
	{
		$fromDate = $this->input->post('fromDate');
		$toDate = $this->input->post('toDate');
		
		$resultViewData['resultsTable'] = $this->searchModel->dateSpanSearch($fromDate, $toDate);
		$resultViewData['searchType']   = /* *** Add var if first/last name can be specified for search *** */ "Date Search Results:"; 		

		$this->load->view('search-results', $resultViewData); 
	}

	public function browseDonors() 
	{
		//$resultViewData['resultsTable'] = $this->searchModel->browseAllDonors();
		$this->load->view('browse-donors'); 
	}

	public function queryDatabaseAllDonors()
	{
		echo json_encode($this->searchModel->browseAllDonors());
	}

	public function queryDatabaseSearchDonors()
	{

	}
}