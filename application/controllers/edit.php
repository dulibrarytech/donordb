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
    }

	public function index()
	{
		$this->load->view('edit-view');
	}

	public function editDonor() 
	{
		// Get current donor ID.  
		// $donorID = $this->uri->segment(3);

		// $data = $this->searchModel->getDonorInfo($donorID);

		// $this->load->view('edit-donor-info', $data);

		// json?
	}

	public function addGift() 
	{ 
		$data['pageLoader'] = "<script>addGiftView.initPage();</script>";

		$this->load->view('gift-view', $data);
	}

	public function enterGift($donorID)
	{
		$data['pageLoader'] = "<script>giftDetailsView.initPage();</script>";

		$this->load->view('gift-view', $data);
	}

	public function addDonor() 
	{
		$data['pageLoader'] = "<script>addDonorInfoView.initPage();</script>";

		$this->load->view('info-view', $data);
	}

	public function inputDonorInfo()
	{

	}

	public function editTitle() 
	{
		echo "edit title function<br />";
	}
}