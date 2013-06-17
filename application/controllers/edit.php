<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class edit extends CI_Controller {

/*
 * Donor Application - Edit Functions
 *
 * Author: Jeff Rynhart
 * 
 * University of Denver, May 2013
 */
    function __construct() 
    {
        parent::__construct();
        $this->load->helper('url');
        $this->load->helper('form');

		$this->load->model('searchModel');
		$this->load->model('titleModel');
    }

	public function index()
	{
		echo "hit edit/index";
	}

	public function editDonor() 
	{
		// Get current donor ID.  
		$donorID = $this->uri->segment(3);

		$data = $this->searchModel->getDonorInfo($donorID);

		$this->load->view('edit-donor-info', $data);

		// json?
	}

	public function addGift() 
	{
		// Get current donor ID.  
		$donorID = $this->uri->segment(3);

		$this->load->view('gift-entry-form');
	}

	public function enterGift($donorID)
	{

	}

	public function addDonor() 
	{
		$this->load->model('titleModel');
		$data['titleData'] = $this->titleModel->listAllTitles();

		$this->load->view('add-donor', $data);
	}

	public function inputDonorInfo()
	{

	}

	public function titleList()
	{
		$resultViewData['resultsTable'] = $this->titleModel->createTitleTable();

		$this->load->view('title-list', $resultViewData);
	}

	public function editTitle() 
	{
		echo "edit title function<br />";
	}
}