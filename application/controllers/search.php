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
	 * Loads Search View 
	 * If 
	 */
	public function index()
	{
		$data['pageLoader'] = "<script>
									searchView.initPage();
									authentication.validateSession();
								</script>";

    	$this->load->view('lookup-view', $data);
	}

	public function recordSearch()
	{
		switch($this->input->server("REQUEST_METHOD")) 
		{

            case "GET":
			{
                $data['pageLoader'] = "<script>searchView.initPage();</script>";

                $this->load->view('lookup-view', $data);

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
                else if($searchType == "anonymous")
                	echo json_encode($this->searchModel->anonymousGiftSearch($keyword,$fromDate,$toDate));
                else
                	echo json_encode("Search type error!");

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

	public function getActiveDonorNameString()
	{
		echo json_encode($this->phpsessions->get('activeDonorNameString'));
	}

	public function queryDatabaseAllDonors()
	{
		echo json_encode($this->searchModel->getAllDonors());
	}

	public function queryDatabaseAllTitles()
	{
		echo json_encode($this->searchModel->getAllTitles());
	}

	public function queryDatabaseNewDonations()
	{
		$data = $this->searchModel->getAllNewDonations();

		$data['action'] = 'viewUtils.displayLetter';
		$data['actionText'] = 'Letter';

		echo json_encode($data);
	}

	public function queryDatabaseTypedLetterRequests()
	{
		echo json_encode($this->searchModel->getAllTypedLetterRequests());
	}

	public function queryDatabaseGiftData($giftID = null)
	{
		if($giftID == null)
			$giftID = $this->phpsessions->get('activeGiftID');

		// Main gift data
		$dataArray = $this->searchModel->getGiftData($giftID);

		// Add namestring for view display
		$dataArray['nameString'] = $this->phpsessions->get('activeDonorNameString');

		echo json_encode($dataArray);
	}

	public function queryDatabaseDonorData($donorID = null)
	{
		if($donorID == null)
			$donorID = $this->phpsessions->get('activeDonorID');

		echo json_encode($this->searchModel->getDonorData($donorID));
	}

	public function queryDatabaseDonorGifts($donorID = null)
	{
		if($donorID == null)
			$donorID = $this->phpsessions->get('activeDonorID');

		$giftDataArray = $this->searchModel->getDonorGifts($donorID);

		// Send over the current active giftID
		//$giftDataArray['activeGiftID'] = $this->phpsessions->get('activeGiftID');

		// Set the active gift to the first giftID in the gift array, if it has not yet been set 
		$giftID = $this->phpsessions->get('activeGiftID');
		if($giftID != null)
			$giftDataArray['activeGiftID'] = $giftID;
		else
		{
			reset($giftDataArray);
			$firstKey = key($giftDataArray);
			$this->phpsessions->set('activeGiftID', $firstKey);
			$giftDataArray['activeGiftID'] = $firstKey;
		}

		echo json_encode($giftDataArray);
	}

	public function getLetter()
	{
		$giftID = $this->input->post('giftID');

		if($giftID != null)
		{
			$this->load->helper('letter_helper');
			$this->load->helper('dbdate_helper');
			$this->load->model('editModel');

			$donorID = $this->searchModel->getDonorOfGift($giftID);

			if($donorID == 0)
			{
				$data['errorMsg'] = "Database error: donor not found";
			}
			else
			{
				$donorData = $this->searchModel->getDonorData($donorID);

				$giftData = $this->searchModel->getGiftData($giftID);

				$data = array_merge($donorData,$giftData);
				$data['titleString'] = $this->searchModel->getTitle($data['titleID']);  

				$data['giftDate'] = convertDateToNormalFormat($data['giftDate']);
			}			

			// *** Auto-set letter as 'complete'.  Can add option to do so manually if necessary
			$this->editModel->setLetterAsSent($giftID);

			echo json_encode(generateLetter($data));
		}
		else
			echo json_encode("Error: missing gift ID");
	}
}