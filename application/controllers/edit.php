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

		$this->load->model('editModel');
		$this->load->model('searchModel');
    }

	public function index()
	{
		$this->load->view('edit-view');
	}

	public function newGiftView() 
	{ 
		$data['pageLoader'] = "<script>newGiftView.initPage();</script>";

		$this->load->view('gift-view', $data);
	}

	public function addGiftView()
	{
		$donorID = $this->uri->segment(3);

		$data['pageLoader'] = "<script>addGiftView.initPage();</script>";
		//$data['nameString'] = $this->searchModel->getNameString($donorID);

		$this->phpsessions->set('activeDonorID', $donorID);
		$this->phpsessions->set('activeDonorNameString', $this->searchModel->getNameString($donorID));

		$this->load->view('gift-view', $data);
	}

	public function addGift()
	{

	}

	public function editGift() 
	{
		// do I want to edit the gift separately?  Can I just bring up the donor info page with the requested gift date defaulted in the date box?
	}

	public function addDonor() 
	{
		$data['pageLoader'] = "<script>addNewDonorView.initPage();</script>";

		$this->load->view('info-view', $data);
	}

	public function inputDonorInfo()
	{
		switch($this->input->server("REQUEST_METHOD")) 
		{

            case "GET":
			{
                $this->load->view("lookup-view");

                break;
            }
            case "POST":
            {
                $donorID = 0;
                $giftID = 0;

                $donorData = $this->input->post();
                
                $donorID = $this->editModel->createDonorRecord($donorData);

                // If box is checked, no gift needs to be added at this time
                $addGiftCheck = $this->input->post('addGiftCheckbox');
                if($addGiftCheck == "") {

                	$giftID = $this->editModel->createGiftRecord($donorID, $donorData);
                }
                else if($addGiftCheck == "checked")
                	$giftID = 1;

                if($donorID > 0 && $giftID > 0) 
                	echo "Database was successfully updated.";
                else
                	echo "Error in updating database";

                break;
            }
            default:
           	{
                header("HTTP/1.1 404 Not Found");
                return;
            }
        }
	}

	public function editDonorView() 
	{
		// Get current donor ID.  
		// $donorID = $this->uri->segment(3);

		// $data = $this->searchModel->getDonorInfo($donorID);

		// $this->load->view('edit-donor-info', $data);

		// json?
	}

	public function editTitle() 
	{
		echo "edit title function<br />";
	}
}