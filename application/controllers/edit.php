<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class edit extends CI_Controller {

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

		$this->load->model('editModel');
		$this->load->model('searchModel');
    }

	public function index()
	{
		$this->load->view('edit-view');
	}

	// public function newGiftView() 
	// { 
	// 	$data['pageLoader'] = "<script>newGiftView.initPage();</script>";

	// 	$this->load->view('gift-view', $data);
	// }

	public function addGiftView($donorID)
	{
      if(!isset($donorID) || $donorID == null)
      {
          $this->load->view("lookup-view");
      }
      else
      {
          $datestring = "%Y-%m-%d";
              $time = time();
              $date =  mdate($datestring,$time);   

          $data['pageLoader'] = "<script>addGiftView.initPage();</script>";
          $data['date'] = $date;

          $this->phpsessions->set('activeDonorID', $donorID);

          if($donorID == 1)
            $this->phpsessions->set('activeDonorNameString', "Anonymous Donor");
          else
            $this->phpsessions->set('activeDonorNameString', $this->searchModel->getNameString($donorID));

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

            $giftData = $this->input->post();

            $giftID = $this->editModel->createGiftRecord($donorID,$giftData);

            if($giftID > 0) 
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

	public function editGiftView($donorID = null, $giftID = null) 
	{
		  $data['pageLoader'] = "<script>editGiftView.initPage();</script>";

      if($donorID != null)
      {
          $this->phpsessions->set('activeDonorID', $donorID);
          $this->phpsessions->set('activeDonorNameString', $this->searchModel->getNameString($donorID));
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

              $giftData = $this->input->post();

              if($this->editModel->editGiftRecord($giftID,$giftData)) 
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

	public function addDonorView() 
	{
		  $data['pageLoader'] = "<script>addNewDonorView.initPage();</script>";

      $this->phpsessions->set('activeDonorID', null);
      $this->phpsessions->set('activeDonorNameString', "");
      $this->phpsessions->set('activeGiftID', null);

		  $this->load->view('info-view', $data);
	}

  public function addAnonymousDonorInfoView() 
  {
      $data['pageLoader'] = "<script>addAnonymousDonorInfo.initPage();</script>";

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

                $donorData = $this->input->post();
                
                $donorID = $this->editModel->createDonorRecord($donorData);

                // // If box is checked, no gift needs to be added at this time
                // $addGiftCheck = $this->input->post('addGiftCheckbox');
                // if($addGiftCheck == "") {

                $giftID = $this->editModel->createGiftRecord($donorID, $donorData);
                // }
                // else if($addGiftCheck == "checked")
                // 	$giftID = 1;

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

	public function editDonorView($donorID, $giftID = null) 
	{
      $data['pageLoader'] = "<script>editDonorView.initPage();</script>";

      $this->phpsessions->set('activeDonorID', $donorID);
      $this->phpsessions->set('activeDonorNameString', $this->searchModel->getNameString($donorID));

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

              $donorData = $this->input->post();

              if($this->editModel->editDonorRecord($donorID,$donorData)) 
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

              $newTitle = $this->input->post('title');

              $titleID = $this->editModel->addTitle($newTitle);

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

  public function setSessionActiveGift($giftID)
  {
      //$donorID = $this->phpsessions->get('activeDonorID');
      //$giftID = $this->searchModel->getGiftIDForGiftDate($donorID,$giftDate);

      $message = "Gift record not found for selected date...";

      if($giftID > 0)
      {
          $this->phpsessions->set('activeGiftID', $giftID);

          $message = "ID set";
      }

      echo $message;
  }
}