<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/*
 * Donor Application
 *
 * Search_model - functions related to data retrieval
 *
 * Author: Jeff Rynhart
 * 
 * University of Denver, June 2013
 */
 
class Search_model extends CI_Model 
{
    function __construct() 
    {
        parent::__construct();
        $this->load->database();
        $this->load->helper('date');
        $this->load->helper('file');
        $this->load->helper('dbdate_helper');
    }

    public function donorSearch($keyword)
   	{
   		  $searchResults = array();
   		  $index = 0;

     	  // Search LastName field
     	  $this->db->select('donorID, Organization, FirstName, LastName, anonymous');
   		  $this->db->from('tbl_donorinfo');
   		  $this->db->like('LastName', $keyword);		// *** Search by last name by default.  May add options later *** //
          $this->db->where('anonymous !=', 1);
          $this->db->where('donorID !=', 1);
   		  $this->db->order_by('LastName');
   		
     		$query = $this->db->get();

     		if ($query->num_rows() > 0)
     		{ 	
      		 	foreach ($query->result() as $results)
      		 	{
      			 		$searchResults[$index]['firstName']		 = $results->FirstName;
      			 		$searchResults[$index]['lastName']		 = $results->LastName;
      			 		$searchResults[$index]['donorID']		   = $results->donorID;
                $searchResults[$index]['org']          = $results->Organization;

      			 		$index++;
            }
  		 	} 		 		
     		else
     		{
            // Search Organization field
       			$this->db->select('donorID, Organization, FirstName, LastName, anonymous');
      	 		$this->db->from('tbl_donorinfo');
      	 		$this->db->like('Organization', $keyword);	
            $this->db->where('anonymous !=', 1);
            $this->db->where('donorID !=', 1);	
      	 		$this->db->order_by('LastName');
      	 		
      	 		$query = $this->db->get();

      	 		if ($query->num_rows() > 0)
       			{
                // Display the organization in the last name column, even if a last name is present in the record
                foreach ($query->result() as $results)
        		 		{ 
           					$searchResults[$index]['lastName']    = $results->Organization;
                    $searchResults[$index]['firstName']   = "";
          		 			$searchResults[$index]['donorID']     = $results->donorID;

                    $index++;
        		 		}
       			}
       			else
       			{
         				$searchResults = "No results found";
       			}
     		}

    		return $searchResults;
    }

   	public function giftsearch($keyword = "", $fromDate, $toDate, $searchType, $firstName = "")
   	{
        $searchResults = array();
        $index = 0;

        if($fromDate == null)
            $fromDate = "1864-01-01";   // Shouldn't be any before this!
        if($toDate == null)
        {
            $datestring = "%Y-%m-%d";
            $time = time();

            $toDate = mdate($datestring,$time);
        }

        // Gift search
        $this->db->trans_start();
        $this->db->select('tbl_donorgifts.giftsID, tbl_donorgifts.letter, tbl_donorgifts.bypassLetter, tbl_donorgifts.dateOfGift, tbl_donorgifts.numberOfGifts, tbl_donorinfo.donorID, tbl_donorinfo.FirstName, tbl_donorinfo.LastName, tbl_donorinfo.Organization, tbl_donorgiftdescriptions.giftDetails, tbl_donorgiftdescriptions.giftDescription1');
        $this->db->from('tbl_donorgifts');
        $this->db->join('tbl_donorinfo', 'tbl_donorinfo.donorID = tbl_donorgifts.donorID', 'inner');
        $this->db->join('tbl_donorgiftdescriptions', 'tbl_donorgifts.giftsID = tbl_donorgiftdescriptions.giftsID', 'inner');
        $this->db->where('tbl_donorgifts.dateOfGift >=', $fromDate);
        $this->db->where('tbl_donorgifts.dateOfGift <=', $toDate);
        
        // Options
        if($searchType == "anonymous")
        {
            log_message('info', 'anon type');
            $this->db->where('tbl_donorinfo.donorID', 1);
            if($keyword != "")
              $this->db->like('tbl_donorgiftdescriptions.giftDescription1', $keyword); 
        }
        else if($searchType == "anonymousDetails")
        {
            $this->db->where('tbl_donorinfo.donorID', 1);  
            if($keyword == "")
              $keyword = "abcdefg";
            $this->db->like('tbl_donorgiftdescriptions.giftDetails', $keyword);
        }
        else if($searchType == "giftDetails")
        {
            $this->db->where('tbl_donorinfo.donorID !=', 1);
            if($keyword == "")
              $keyword = "abcdefg";
            $this->db->like('tbl_donorgiftdescriptions.giftDetails', $keyword);
        }
        else // Standard gift search
        {
            $this->db->where('tbl_donorinfo.donorID !=', 1);

            if($keyword != "")
            {
                $this->db->like('tbl_donorinfo.LastName', $keyword);    
                //$this->db->order_by('LastName', 'desc');
            }
            if($firstName != "")
            {
                $this->db->like('tbl_donorinfo.FirstName', $firstName);    
            }
        }

        // Close query
        $this->db->order_by("tbl_donorgifts.dateOfGift", "desc");
        $this->db->trans_complete();

        $query = $this->db->get();
        if ($query->num_rows() > 0)
        {
            foreach ($query->result() as $results)
            { 
                $searchResults[$index]['giftsID']       = $results->giftsID;
                $searchResults[$index]['giftQuantity']  = $results->numberOfGifts;
                $searchResults[$index]['giftDate']      = truncateDateString($results->dateOfGift); 
                $searchResults[$index]['firstName']     = $results->FirstName;
                $searchResults[$index]['lastName']      = $results->LastName;
                $searchResults[$index]['donorID']       = $results->donorID;
                $searchResults[$index]['org']           = $results->Organization;
                $searchResults[$index]['letter']        = $results->letter;
                $searchResults[$index]['bypassLetter']  = $results->bypassLetter;

                $index++;
            }
        }
        else
        {
            $searchResults = "No results found";
        }

        return $searchResults;
   	}

   	// Will check all records of gifts that the donor has donated.  If one gift date falls within the given date range, return true
    private function dateScreen($donorID,$fromDate,$toDate)
   	{
     		$giftsInRange = false;

     		$this->db->select('donorID,dateOfGift');
     		$this->db->from('tbl_donorgifts');
     		$this->db->where('donorID', $donorID);
     		$this->db->where('dateOfGift >=', $fromDate);
     		$this->db->where('dateOfGift <=', $toDate);

     		$query = $this->db->get();

     		if ($query->num_rows() > 0)
     		{
      			// Return true if this donor has donated any gifts within the range.
      			$giftsInRange = true;
     		} 

     		return $giftsInRange;
   	}

    // // Removes the timestamp from the date string
    // private function truncateDateString($dateString)
    // {
    //     return substr($dateString,0,-9);
    // }

   	public function getAllDonors()
   	{
 		$donorInfo = array();
 		$index = 0;

 		$this->db->select('donorID, FirstName, LastName, Organization');
 		$this->db->from('tbl_donorinfo');
        $this->db->where('anonymous !=', 1);
        $this->db->where('donorID !=', 1);
 		$this->db->order_by('LastName');
    $this->db->order_by('Organization');
 		$query = $this->db->get();

 		if ($query->num_rows() > 0)
		    { 	
  		 	foreach ($query->result() as $results)
  		 	{
    		 		// Remove 'null' string.  
                    if($results->FirstName == null)
                        $results->FirstName = "";
                    if($results->LastName == null)
                        $results->LastName = "";
                    if($results->Organization == null)
                        $results->Organization = "";

                    $donorInfo[$index]['firstName'] 	= $results->FirstName;
    		 		$donorInfo[$index]['lastName']  	= $results->LastName;
                    $donorInfo[$index]['org']           = $results->Organization;
    		 		$donorInfo[$index]['donorID']  		= $results->donorID;

    		 		$index++;
  		 	}
 		}
 		else
 		{
   			$donorInfo = 'Error connecting to database.';
 		}

 		return $donorInfo;
   	}

   	public function getAllTitles() 
   	{
     		$titleInfo = array();
     		//$index = 0;

     		$this->db->select('titleID, title');
   		  $this->db->from('tbl_donortitle_lkup');
   		  $query = $this->db->get();

     		if ($query->num_rows() > 0)
     		{ 	
      		 	foreach ($query->result() as $results)
      		 	{
        		 		if($results->title == "")
          		 			continue;

        		 		$titleInfo[$results->titleID]	= $results->title;
      		 	}
     		}
     		else
     		{
       			$titleInfo = 'Error connecting to database.';
     		}

     		return $titleInfo;
   	}

    public function getAllNewDonations()
    {
        $newDonations = array();
        $index = 0;

        $this->db->trans_start();
        $this->db->select('tbl_donorgifts.giftsID, tbl_donorgifts.dateOfGift, tbl_donorgifts.donorID, tbl_donorgifts.donorID, tbl_donorgifts.bypassLetter, tbl_donorinfo.Organization, tbl_donorinfo.FirstName, tbl_donorinfo.LastName');
        $this->db->from('tbl_donorgifts');
        $this->db->join('tbl_donorinfo', 'tbl_donorgifts.donorID = tbl_donorinfo.donorID', 'inner');
        $this->db->where('tbl_donorgifts.letter', 1);
        $this->db->where('tbl_donorgifts.important !=', 1);
        $this->db->where('tbl_donorgifts.bypassLetter !=', 1);
        $this->db->order_by("dateOfGift", "desc");
        $query = $this->db->get();
        $this->db->trans_complete();

        if ($query->num_rows() > 0)
        {
            foreach ($query->result() as $results)
            {
                $newDonations[$index]['giftID']       = $results->giftsID;
                $newDonations[$index]['giftDate']     = truncateDateString($results->dateOfGift); 
                $newDonations[$index]['org']          = $results->Organization;
                $newDonations[$index]['donorID']      = $results->donorID;
                $newDonations[$index]['firstName']    = $results->FirstName;
                $newDonations[$index]['lastName']     = $results->LastName;

                $index++;
            }
        }
        else
        {
            $newDonations = "No new donations.";
        }           

        return $newDonations;
    }

    public function getAllTypedLetterRequests()
    {
        $requests = array();
        $index = 0;

        $this->db->trans_start();
        $this->db->select('tbl_donorgifts.giftsID, tbl_donorgifts.dateOfGift, tbl_donorgifts.donorID, tbl_donorgifts.bypassLetter, tbl_donorinfo.Organization, tbl_donorinfo.FirstName, tbl_donorinfo.LastName');
        $this->db->from('tbl_donorgifts');
        $this->db->join('tbl_donorinfo', 'tbl_donorgifts.donorID = tbl_donorinfo.donorID', 'inner');
        $this->db->where('tbl_donorgifts.important', 1);
        $this->db->where('tbl_donorgifts.letter', 1);
        $this->db->where('tbl_donorgifts.bypassLetter !=', 1);
        $this->db->order_by("dateOfGift", "desc");
        $query = $this->db->get();
        $this->db->trans_complete();

        if ($query->num_rows() > 0)
        {
            foreach ($query->result() as $results)
            {
                $requests[$index]['giftID']       = $results->giftsID;
                $requests[$index]['giftDate']     = truncateDateString($results->dateOfGift); 
                $requests[$index]['org']          = $results->Organization;
                $requests[$index]['donorID']      = $results->donorID;
                $requests[$index]['firstName']    = $results->FirstName;
                $requests[$index]['lastName']     = $results->LastName;

                $index++;
            }
        }
        else
        {
            $requests = "No requests at this time.";
        }
            

        return $requests;
    }

    public function getTitleID($titleText)
    {
        $ID = 0;

        $this->db->select('titleID');
        $this->db->from('tbl_donortitle_lkup');
        $this->db->where('title', $titleText);

        $query = $this->db->get();

        if($query->num_rows() > 0)
        {
            foreach ($query->result() as $results)
            {
                $ID = $results->titleID;
            }
        }
        
        return $ID;
    }

   	public function getDonorData($ID)
   	{
     		$donorInfo = array();

     		$this->db->select();
     		$this->db->from('tbl_donorinfo');
     		$this->db->where('donorID', $ID);

     		$query = $this->db->get();

        if ($query->num_rows() > 0)
        {
            foreach ($query->result() as $result)
            {
                $donorInfo['titleID']     = $result->titleID;
                $donorInfo['firstName']   = $result->FirstName;
                $donorInfo['lastName']    = $result->LastName;
                $donorInfo['org']         = $result->Organization;
                $donorInfo['addr1']       = $result->Address1;
                $donorInfo['addr2']       = $result->Address2;
                $donorInfo['city']        = $result->City;
                $donorInfo['state']       = $result->State;
                $donorInfo['country']     = $result->Country;
                $donorInfo['zip']         = $result->PostalCode;
                $donorInfo['phone']       = $result->phone;
                $donorInfo['email']       = $result->email;
            }
        }
        else
            $donorInfo['lastName'] = "No data found / or database error";
     		
     		return $donorInfo;
   	}

    public function getGiftData($giftID)
    {
        $giftInfo = array("giftDescription" => "Data Not Found.  GiftID: " . $giftID);
        $giftInfo['letterFlag'] = -1;

        if($giftID != null)
        {
            $this->db->trans_start();
            $this->db->select('tbl_donorgifts.dateOfGift, tbl_donorgifts.numberOfGifts, tbl_donorgifts.letter, tbl_donorgifts.important, tbl_donorgifts.bypassLetter, tbl_donorgiftdescriptions.giftDescription1, tbl_donorgiftdescriptions.giftDetails');
            $this->db->from('tbl_donorgifts');
            $this->db->join('tbl_donorgiftdescriptions', 'tbl_donorgifts.giftsID = tbl_donorgiftdescriptions.giftsID', 'inner');
            $this->db->where('tbl_donorgifts.giftsID', $giftID);
            $this->db->order_by("dateOfGift", "desc");
            $this->db->trans_complete();

            $query = $this->db->get();

            if ($query->num_rows() > 0)
            {
                foreach ($query->result() as $result)
                {
                    $giftInfo['giftQuantity']     = $result->numberOfGifts;
                    $giftInfo['giftDescription']  = $result->giftDescription1;
                    $giftInfo['giftDate']         = truncateDateString($result->dateOfGift); 
                    $giftInfo['letterFlag']       = $result->letter;
                    $giftInfo['importantFlag']    = $result->important;
                    $giftInfo['bypassLetter']     = $result->bypassLetter;
                    $giftInfo['giftDetails']      = $result->giftDetails;
                }
            }
            else 
            {
                $giftInfo['giftDescription'] = "No data found / or database error";

                log_message('info', 'getGiftData: No data found / or database error');
            }    
        }
        else 
        {
          log_message('info', 'getGiftData: Null giftID');
        }

        return $giftInfo;
    }

    public function getDonorGifts($donorID)
    {
        $giftData = array();

        if($donorID != null)
        {
            $this->db->select();
            $this->db->from('tbl_donorgifts');
            $this->db->where('donorID', $donorID);
            if($donorID == 1)
            {
              $giftID = $this->phpsessions->get('activeGiftID');
              if($giftID != null)
                $this->db->where('giftsID', $giftID);
            }

            $query = $this->db->get();

            if ($query->num_rows() > 0)
            { 
                foreach ($query->result() as $result)
                {
                    if($result->dateOfGift != null)
                      $giftData[$result->giftsID] = truncateDateString($result->dateOfGift);
                    else
                      $giftData[$result->giftsID] = "Undated Gift";
                }
            }
        }

        return $giftData;
    }

    public function getNameString($ID)
    {
        $nameString = "";

        if($ID != null)
        {
          $this->db->select('FirstName, LastName, Organization');
          $this->db->from('tbl_donorinfo');
          $this->db->where('donorID', $ID);

          $query = $this->db->get();

          foreach ($query->result() as $result)
          {
              $fName   = $result->FirstName;
              $lName   = $result->LastName;
              $org     = $result->Organization;
          }

          if($lName != "" && $lName != null)
          {
              $nameString = $lName;

              if($fName != "" && $fName != null)
              {
                  $nameString .= ", " . $fName;
              }
              if($org != "" && $org != null)
              {
                  $nameString .= " (" . $org . ")";
              }
          }
          else
          {
              $nameString = $org;
          }
        }
            
        return $nameString;
    }

    public function getGiftIDForGiftDate($donorID, $giftDate)
    {
        $ID = 0;

        if($donorID != null && $giftDate != null)
        {
            $this->db->select('giftsID');
            $this->db->from('tbl_donorgifts');
            $this->db->where('donorID',$donorID);
            $this->db->where('dateOfGift',$giftDate);

            $query = $this->db->get();

            foreach ($query->result() as $result)
            {
                $ID = $result->giftsID;
            }
        }

        return $ID;
    }

    public function getGiftDescription($giftID)
    {
      $description = "";

      if($giftID != null)
        {
            $this->db->select('giftDescription1');
            $this->db->from('tbl_donorgiftdescriptions');
            $this->db->where('giftsID',$giftID);

            $query = $this->db->get();

            foreach ($query->result() as $result)
            {
                $description = $result->giftDescription1;
            }
        }

        return $description;
    }

    public function getDonorOfGift($giftID)
    {
        $ID = 0;

        if($giftID != null)
        {
            $this->db->select('donorID');
            $this->db->from('tbl_donorgifts');
            $this->db->where('giftsID',$giftID);

            $query = $this->db->get();

            foreach ($query->result() as $result)
            {
                $ID = $result->donorID;
            }
        }

        return $ID;
    }

    public function getTitle($titleID)
    {
        $title = "";

        if($titleID != null)
        {
            $this->db->select('title');
            $this->db->from('tbl_donortitle_lkup');
            $this->db->where('titleID',$titleID);

            $query = $this->db->get();

            foreach ($query->result() as $result)
            {
                $title = $result->title;
            }
        }

        return $title;
    }

    public function getEmailAddressList($roleID)
    {
      $list = array();

        if($roleID != null)
        {
            $this->db->select('email');
            $this->db->from('tbl_donorusers');
            $this->db->where('roleID',$roleID);

            $query = $this->db->get();

            foreach ($query->result() as $result)
            {
                array_push($list, $result->email);
            }
        }

        return $list;
    }

} // Search_model