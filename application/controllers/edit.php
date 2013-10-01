<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Edit extends CI_Controller {

/*
 * Donor Application - Edit Functions
 *
 * Author: Jeff Rynhart
 * 
 * University of Denver, May 2013
 */

/*
 * TODO: Fix text format of this file
 *
 */
    function __construct() 
    {
        parent::__construct();

        $this->load->helper('url');
        $this->load->helper('form');
        $this->load->helper('sanitizer');

		    $this->load->model('Edit_model');
		    $this->load->model('Search_model');
    }

	public function index()
	{
		$this->load->view('edit-view');
	}

	public function addGiftView($donorID, $nameString = "")
	{
      if(!isset($donorID) || $donorID == null)
      {
          //$this->load->view("lookup-view");
          // log error and redirect to error msg
      }
      else
      {
          $datestring = "%Y-%m-%d";
              $time = time();
              $date =  mdate($datestring,$time);   

          $data['date'] = $date;

          $this->phpsessions->set('activeDonorID', $donorID);

          // If nameString arg is passed in, set it here.  Otherwise, set it based on the donorID
          if($nameString != "")
          {
              $this->phpsessions->set('activeDonorNameString', $nameString);
          }
          else
          {
              if($donorID == 1) 
              {
                  $data['pageLoader'] = "<script>addGiftView.initPage(" . 1 . ");</script>";
                  $this->phpsessions->set('activeDonorNameString', "Anonymous Donor");
              }
                  
              else
              {
                  $data['pageLoader'] = "<script>addGiftView.initPage(" . 0 . ");</script>";
                  $this->phpsessions->set('activeDonorNameString', $this->Search_model->getNameString($donorID));
              }
          }          

          $this->load->view('gift-view', $data);
      }          
	}

	// input gift info
  public function addGift($donorID = null)
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
            $giftID = 0;

            if($donorID == null)
              $donorID = $this->phpsessions->get('activeDonorID');

            $postData = $this->input->post();
            $giftData = sanitizePost($postData);

            // Anonymous donor
            if($donorID == 1)
                $giftData['letterFlag'] = 0;

            $giftID = $this->Edit_model->createGiftRecord($donorID,$giftData);

            if($giftID > 0) 
            {
                $this->phpsessions->set('activeGiftID', $giftID);
                echo "Database was successfully updated.";
            }            	
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

	public function editGiftView($donorID = null, $giftID = null) 
	{
		  if($donorID == 1)
        $data['pageLoader'] = "<script>editGiftView.initPage(" . 1 . ");</script>";
      else
        $data['pageLoader'] = "<script>addGiftView.initPage(" . 0 . ");</script>";

      if($donorID != null)
      {
          $this->phpsessions->set('activeDonorID', $donorID);
          $this->phpsessions->set('activeDonorNameString', $this->Search_model->getNameString($donorID));
      }
      if($giftID != null)
          $this->phpsessions->set('activeGiftID', $giftID);


      $this->load->view('gift-view', $data);
	}

  public function inputGiftEdit($giftID = null)
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
              if($giftID == null)
                  $giftID = $this->phpsessions->get('activeGiftID');

              $postData = $this->input->post();
              $giftData = sanitizePost($postData);

              if($this->Edit_model->editGiftRecord($giftID,$giftData)) 
                echo "Database was successfully updated.";
              else
                echo "Error in updating database.";

              break;
          }
          default:
          {
              header("HTTP/1.1 404 Not Found");
              return;
          }
      }
  }

	public function addDonorView($anonymous = 0) 
	{
		  $data['pageLoader'] = "<script>addNewDonorView.initPage(" . $anonymous . ");</script>";

      $this->phpsessions->set('activeDonorID', null);
      $this->phpsessions->set('activeDonorNameString', "");
      $this->phpsessions->set('activeGiftID', null);

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
                $updateOK = FALSE;

                $postData = $this->input->post();
                $donorData = sanitizePost($postData);

                log_message("info", "postdata: " . print_r($donorData, true));
                
                $donorID = $this->Edit_model->createDonorRecord($donorData);
                if($donorID > 0)
                  $updateOK = TRUE;
                else
                  log_message("info", "Error in updating database with new donor info");

                // Bug 202: Only add new gift if a gift description has been entered.
                if($donorData['giftDescription'] != "")
                {
                  $giftID = $this->Edit_model->createGiftRecord($donorID, $donorData);
                  if($giftID <= 0)
                  {
                    $updateOK = FALSE;
                    log_message("info", "Error in updating database with new gift info (Add donor)");
                  }
                }
                  
                if($updateOK) 
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

	public function editDonorView($donorID, $giftID = null) 
	{
      $data['pageLoader'] = "<script>editDonorView.initPage();</script>";

      $this->phpsessions->set('activeDonorID', $donorID);
      $this->phpsessions->set('activeDonorNameString', $this->Search_model->getNameString($donorID));

      // If a giftID arg is passed in, set the active gift now.  If not, this is a general donor info view, no active gift yet
      if($giftID != null)
        $this->phpsessions->set('activeGiftID', $giftID);
      else
        $this->phpsessions->set('activeGiftID', null);

      $this->load->view('info-view', $data);
	}

  public function inputDonorEdit($donorID = null)
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
              if($donorID == null)
                  $donorID = $this->phpsessions->get('activeDonorID');

              $postData = $this->input->post();
              $donorData = sanitizePost($postData);

              if($this->Edit_model->editDonorRecord($donorID,$donorData)) 
                echo "Database updated successfully";
              else
                echo "Error in updating database.";

              break;
          }
          default:
          {
              header("HTTP/1.1 404 Not Found");
              return;
          }
      }
  }

	public function addTitle() 
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
              $titleID = 0;

              $postData = $this->input->post('title');
              $newTitle = sanitizeString($postData);

              $titleID = $this->Edit_model->addTitle($newTitle);

              if($titleID > 0) 
              {
                  $response['message'] = "Database was successfully updated.";
                  $response['ID'] = $titleID;
              }
              else
              {
                  $response['message'] = "Error in updating database";
                  $response['ID'] = 0;
              }

              echo json_encode($response);

              break;
          }
          default:
          {
              header("HTTP/1.1 404 Not Found");
              return;
          }
      }
	}

  public function setSessionActiveGift($giftID,$data = null)
  {
      //$donorID = $this->phpsessions->get('activeDonorID');
      //$giftID = $this->Search_model->getGiftIDForGiftDate($donorID,$giftDate);

      $message = "Set Active Gift Error";

      $this->phpsessions->set('activeGiftDate', null);
      $this->phpsessions->set('activeGiftQuantity', null);
      $this->phpsessions->set('activeGiftDescription', null);

      if($giftID > 0)
      {
          $this->phpsessions->set('activeGiftID', $giftID);

          $message = "ID set";
      }

      echo $message;
  }

  public function setTempGiftData($data = null)
  {
      $message = "Set Gift Data Error";

      $this->phpsessions->set('tempGiftDate', null);
      $this->phpsessions->set('tempGiftQuantity', null);
      $this->phpsessions->set('tempGiftDescription', null);

      if(is_array($data))
      {
          if(isset($data['giftDate']))
            $this->phpsessions->set('activeGiftDate', $data['giftDate']);
          if(isset($data['giftQuantity']))
            $this->phpsessions->set('activeGiftQuantity', $data['giftQuantity']);
          if(isset($data['giftQuantity']))
            $this->phpsessions->set('activeGiftDescription', $data['giftDescription']);

           $message = "gift data set";
      }
  }

  public function sendLetter() 
  {
    $giftID = $this->input->post('giftID');

    if($giftID != null)
    {
      $this->Edit_model->setLetterAsSent($giftID);
    }
  }
}