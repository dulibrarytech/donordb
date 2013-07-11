<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');


/*
 * Donor Application
 *
 * Search and display functions
 *
 * Author: Jeff Rynhart
 * 
 * University of Denver, June 2013
 */
class search extends CI_Controller {

    function __construct() 
    {
        parent::__construct();
        $this->load->helper('url');
		$this->load->model('searchModel');
    }

	/*
	 * Search View 
	 */
	public function index()
	{
		// TODO: any necessary initial security measures

		$data['pageLoader'] = "<script>searchView.initPage();</script>";

		$this->load->view('lookup-view', $data);
	}

	public function recordSearch()
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
                $keyword 	= $this->input->post('searchTerm');
                $fromDate 	= $this->input->post('fromDate');
                $toDate 	= $this->input->post('toDate');
                $searchType = $this->input->post('searchType');

                if($searchType == "donor")
					echo json_encode($this->searchModel->donorSearch($keyword)); 
                else if($searchType == "gift")
                	echo json_encode($this->searchModel->giftSearch($keyword,$fromDate,$toDate)); 

                break;
            }
            default:
           	{
                header("HTTP/1.1 404 Not Found");
                return;
            }
        }
	}

	public function browseDonors() 
	{
		$data['pageLoader'] = "<script>browseDonorsView.initPage();</script>";

		$this->load->view('table-view', $data);
	}

	public function queryDatabaseAllDonors()
	{
		echo json_encode($this->searchModel->getAllDonors());
	}

	public function queryDatabaseAllTitles()
	{
		echo json_encode($this->searchModel->getAllTitles());
	}

}