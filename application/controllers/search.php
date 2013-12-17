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
class Search extends CI_Controller {

    function __construct() 
    {
        parent::__construct();
        $this->load->helper('url');
        $this->load->helper('sanitizer_helper');
		$this->load->model('Search_model');
    }

	/*
	 * Loads Search View 
	 * If 
	 */
	public function index($resetSearchCache = TRUE)
	{
		if($resetSearchCache) 
		{
			$this->phpsessions->set('prevSearchResults', null);
		}
		
		$data['pageLoader'] = "<script>
									searchView.initPage();
									authentication.validateSession();
								</script>";

    	$this->load->view('lookup-view', $data);
    	//echo "<h1 style='margin-top:100px;'>ECHO TEST" . $resetSearchCache . "</h1>";
	}

	public function recordSearch()
	{
		switch($this->input->server("REQUEST_METHOD")) 
		{

            case "GET":
			{
                $data['pageLoader'] = "<script>
										searchView.initPage();
										authentication.validateSession();
									</script>";

                $this->load->view('lookup-view', $data);

                break;
            }
            case "POST":
            {
                // Attempt to get posted search data
                $keyword 	= $this->input->post('searchTerm');
                $fromDate 	= $this->input->post('fromDate');
                $toDate 	= $this->input->post('toDate');
                $searchType = $this->input->post('searchType');

                // If no data in POST, or if this is a reload search, get the data from the session array.
                // The session array holds search results until the search page is loaded again.  
                if($searchType == null || $searchType == "reload")
                {
                	$resultArray = $this->phpsessions->get('prevSearchResults');

                	// If there are no search results cached in the session, echo an error message string
                	if(!is_array($resultArray))
                		$resultArray = "Search error: no search data found";

                	echo json_encode($resultArray);
                }                
                else // Run the search from post data
                {
	                if($searchType == "donor") {

	                	$resultArray = $this->Search_model->donorSearch($keyword);
	                	$this->phpsessions->set('prevSearchResults', $resultArray);

	                	echo json_encode($resultArray);
	                }	 
	                else 
	                {
	                	// Do gift search
	                	$resultArray = $this->Search_model->giftSearch($keyword,$fromDate,$toDate,$searchType); 

	                	// Convert letter data from bit to human readable data, if result array is not an error string
	                	if(gettype($resultArray) != 'string')
	                	{
		                	foreach($resultArray as $key => $result)
		                	{
		                		$resultArray[$key]['letterStatus'] = "";

		                		if($result['letter'] == null)
									$resultArray['letterStatus'] = "Error";
		                		else if($result['letter'] == 1 && $result['bypassLetter'] == 0)
			                		$resultArray[$key]['letterStatus'] = "Pending";
			                	else if($result['letter'] == 0)
			                		$resultArray[$key]['letterStatus'] = "Sent";
			                	else if($result['letter'] == 1 && $result['bypassLetter'] == 1)
			                		$resultArray[$key]['letterStatus'] = "Bypassed";
			                	else
			                		$resultArray[$key]['letterStatus'] = "Error";
		                	}

		                	// Cache search results
	                		$this->phpsessions->set('prevSearchResults', $resultArray);
	                	}

	                	echo json_encode($resultArray);
	                }
	            }

                break; // case POST
            }
            default:
           	{
                header("HTTP/1.1 404 Not Found");
                return;
            }
        }
	}

	public function statisticsSearch()
	{
		switch($this->input->server("REQUEST_METHOD")) 
		{
            case "GET":
			{
                $data['pageLoader'] = "<script>
										searchView.initPage();
										authentication.validateSession();
									</script>";

                $this->load->view('lookup-view', $data);

                break;
            }
            case "POST":
            {
                $keyword 	= $this->input->post('searchTerm');
                $fName 		= $this->input->post('searchTermFName');
                $fromDate 	= $this->input->post('fromDate');
                $toDate 	= $this->input->post('toDate');
                $searchType = $this->input->post('searchType');

                // If no data in POST, or if this is a reload search, get the data from the session array.
                if($searchType == null || $searchType == "reload")
                {
                	$results = $this->phpsessions->get('prevSearchResults');

					if(is_array($results))
                	{
                		// Total the quantity of returned gift entries, and piggyback it in on the array.
		                $total = 0;
		                $totalD = 0;
		                foreach($results as $result)
		                {
		                	$total += $result['giftQuantity'];
		                	$totalD++;
		                }

	                	$results['totalQuantity'] = $total;
	                	$results['totalDonations'] = $totalD;
                	}
                	else // If there are no search results cached in the session, echo an error message string
                		$results = "Search error: no search data found";

                	echo json_encode($results);
                }
                else // Get statistics for post data
                {
	                $results = $this->Search_model->giftSearch($keyword,$fromDate,$toDate,$searchType,$fName);	

	                if(is_array($results))
	                {
						// Cache search results
		            	$this->phpsessions->set('prevSearchResults', $results);

						// Total the quantity of returned gift entries, and piggyback it in on the array.
		                $total = 0;
		                $totalD = 0;
		                foreach($results as $result)
		                {
		                	$total += $result['giftQuantity'];
		                	$totalD++;
		                }

	                	$results['totalQuantity'] = $total;
	                	$results['totalDonations'] = $totalD;
	                }

	                echo json_encode($results);
                }
           
                break; // case POST
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

	public function statisticsView()
	{
		$data['pageLoader'] = "<script>statisticsView.initPage();</script>";

		$this->load->view('lookup-view', $data);
	}

	public function getActiveDonorNameString()
	{
		echo json_encode($this->phpsessions->get('activeDonorNameString'));
	}

	public function getActiveGiftID()
	{
		echo json_encode($this->phpsessions->get('activeGiftID'));
	}

	public function queryDatabaseAllDonors()
	{
		echo json_encode($this->Search_model->getAllDonors());
	}

	public function queryDatabaseAllTitles()
	{
		echo json_encode($this->Search_model->getAllTitles());
	}

	public function queryDatabaseNewDonations()
	{
		$data = $this->Search_model->getAllNewDonations();

		if(gettype($data) != 'string')
		{
			$data[0]['action'] = 'viewUtils.displayLetter';
			$data[0]['actionText'] = 'Letter';
		}

		echo json_encode($data);
	}

	public function queryDatabaseTypedLetterRequests()
	{
		$data = $this->Search_model->getAllTypedLetterRequests();

		if(gettype($data) != 'string')
		{
			$data[0]['action'] = 'utils.setLetterComplete';
			$data[0]['actionText'] = 'Complete';
		}

		echo json_encode($data);
	}

	public function queryDatabaseGiftData($giftID = null)
	{
		if($giftID == null)
			$giftID = $this->phpsessions->get('activeGiftID');

		// Main gift data
		//$dataArray = restoreQuotes($this->Search_model->getGiftData($giftID));
		$dataArray = revertSanitizedPost($this->Search_model->getGiftData($giftID));

		// Add namestring for view display
		$dataArray['nameString'] = $this->phpsessions->get('activeDonorNameString');

		// Convert the db bit data to human-readable, if result array is not an error string
		if(gettype($dataArray) != 'string')
	    {
			if($dataArray['letterFlag'] == null)
				$dataArray['letterStatus'] = "Error";
			else if($dataArray['letterFlag'] == 1 && $dataArray['bypassLetter'] == 0)
				$dataArray['letterStatus'] = "Pending";
			else if($dataArray['letterFlag'] == 0)
				$dataArray['letterStatus'] = "Sent";
			else if($dataArray['letterFlag'] == 1 && $dataArray['bypassLetter'] == 1)
				$dataArray['letterStatus'] = "Bypassed";
			else
				$dataArray['letterStatus'] = "Error";
	    }          	
		
		echo json_encode($dataArray);
	}

	public function queryDatabaseDonorData($donorID = null)
	{
		if($donorID == null)
			$donorID = $this->phpsessions->get('activeDonorID');

		$data = revertSanitizedPost($this->Search_model->getDonorData($donorID));

		echo json_encode($data);
	}

	public function queryDatabaseDonorGifts($donorID = null)
	{
		if($donorID == null)
			$donorID = $this->phpsessions->get('activeDonorID');

		$giftDataArray = $this->Search_model->getDonorGifts($donorID);

		$activeGift = $this->phpsessions->get('activeGiftID');

		if($activeGift != null)
			$giftDataArray['activeGiftID'] = $activeGift;
		else
		{
			reset($giftDataArray);
			$firstKey = key($giftDataArray);
			$this->phpsessions->set('activeGiftID', $firstKey);
			$giftDataArray['activeGiftID'] = $firstKey;
			log_message('info', 'set active gift as: ' .$firstKey);
		}

		echo json_encode($giftDataArray);
	}

	public function getPreviousSearchResults() {

		$keyword = $this->phpsessions->get('prevSearchTerm');
        $fromDate = $this->phpsessions->get('prevFromDate');
        $toDate = $this->phpsessions->get('prevToDate');
        $searchType = $this->phpsessions->get('prevSearchType');
	}

	public function getLetter()
	{
		$giftID = $this->input->post('giftID');
		//$giftID = sanitizeString($postID);

		if($giftID != null)
		{
			$this->load->helper('letter_helper');
			$this->load->helper('dbdate_helper');
			$this->load->model('Edit_model');

			$donorID = $this->Search_model->getDonorOfGift($giftID);

			if($donorID == 0)
			{
				$data['errorMsg'] = "Database error: donor not found";
			}
			else
			{
				$donorData = revertSanitizedPost($this->Search_model->getDonorData($donorID));

				$giftData = revertSanitizedPost($this->Search_model->getGiftData($giftID));

				$data = array_merge($donorData,$giftData);
				$data['titleString'] = $this->Search_model->getTitle($data['titleID']);  

				//$data['giftDate'] = convertDBDateToNormalFormat($data['giftDate']);
				$data['giftDate'] = formatLetterDate($data['giftDate']);
				$data['currentDate'] = getCurrentDate();
			}			

			// *** Auto-set letter as 'complete'.  Can add option to do so manually if necessary (use this->sendLetter)
			//$this->Edit_model->setLetterAsSent($giftID);

			// Read external file

			echo json_encode(generateLetter($data));
		}
		else
			echo json_encode('Error: missing gift ID');
	}

	public function getSigImage()
	{
		$file = read_file(EXTERNAL_IMAGE_DIR);
		echo $file;
	}
}