<?php
/*
 * Donor Application
 *
 * SearchModel - functions related to data retrieval
 *
 * Author: Jeff Rynhart
 * 
 * University of Denver, June 2013
 */
 
class searchModel extends CI_Model 
{
    function __construct() 
    {
        parent::__construct();
        $this->load->database();
        $this->load->helper('date');
    }

    public function donorSearch($keyword)
   	{
   		  $searchResults = array();
   		  $index = 0;

     	  // Search LastName field
     	  $this->db->select('donorID, Organization, FirstName, LastName');
   		  $this->db->from('tbl_donorinfo');
   		  $this->db->like('LastName', $keyword);		// *** Search by last name by default.  May add options later *** //
   		  $this->db->order_by('LastName');
   		
     		$query = $this->db->get();

     		if ($query->num_rows() > 0)
     		{ 	
      		 	foreach ($query->result() as $results)
      		 	{

      			 		$searchResults[$index]['firstName']		= $results->FirstName;
      			 		$searchResults[$index]['lastName']		= $results->LastName;
      			 		$searchResults[$index]['donorID']		= $results->donorID;

      			 		$index++;
            }
  		 	} 		 		
     		else
     		{
       			// Search Organization field
       			$this->db->select('donorID, Organization, FirstName, LastName');
      	 		$this->db->from('tbl_donorinfo');
      	 		$this->db->like('Organization', $keyword);		
      	 		$this->db->order_by('LastName');
      	 		
      	 		$query = $this->db->get();

      	 		if ($query->num_rows() > 0)
       			{
         				foreach ($query->result() as $results)
        		 		{ 
           					$searchResults[$index]['org']			= $results->Organization;
          		 			$searchResults[$index]['donorID']		= $results->donorID;

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

   	public function giftsearch($keyword,$fromDate,$toDate)
   	{
        $searchResults = array();
        $index = 0;

        if($fromDate == null)
            $fromDate = "1864-01-01";   // Shouldn't be any before this!
        if($toDate == null)
        {
            $datestring = "%Y-%m-%d";
            $time = time();

            $toDate =  mdate($datestring,$time);
        }

        $this->db->select('tbl_donorgifts.giftsID, tbl_donorgifts.dateOfGift, tbl_donorinfo.FirstName, tbl_donorinfo.LastName');
        $this->db->from('tbl_donorgifts');
        $this->db->join('tbl_donorinfo', 'tbl_donorinfo.donorID = tbl_donorgifts.donorID', 'inner');
        $this->db->where('dateOfGift >=', $fromDate);
        $this->db->where('dateOfGift <=', $toDate);

        if($keyword != "")
        {
            $this->db->like('tbl_donorinfo.LastName', $keyword);    
            //$this->db->order_by('LastName');
        }

        $query = $this->db->get();

        if ($query->num_rows() > 0)
        {
            foreach ($query->result() as $results)
            { 
                $searchResults[$index]['giftsID']     = $results->giftsID;
                $searchResults[$index]['giftDate']    = $results->dateOfGift; 
                $searchResults[$index]['firstName']   = $results->FirstName;
                $searchResults[$index]['lastName']    = $results->LastName;

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

   	public function getAllDonors()
   	{
     		$donorInfo = array();
     		$index = 0;

     		$this->db->select('donorID, FirstName, LastName');
     		$this->db->from('tbl_donorinfo');
     		$this->db->order_by('LastName');
     		$query = $this->db->get();

     		if ($query->num_rows() > 0)
   		  { 	
      		 	foreach ($query->result() as $results)
      		 	{
        		 		if($results->FirstName == "" && $results->LastName == "")
          		 			continue;

        		 		$donorInfo[$index]['firstName'] 	= $results->FirstName;
        		 		$donorInfo[$index]['lastName']  	= $results->LastName;
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
     		$index = 0;

     		$this->db->select('titleID, title');
   		  $this->db->from('tbl_donortitle_lkup');
   		  $query = $this->db->get();

     		if ($query->num_rows() > 0)
     		{ 	
      		 	foreach ($query->result() as $results)
      		 	{
        		 		if($results->title == "")
          		 			continue;

        		 		$titleInfo[$index]['title'] 	= $results->title;
        		 		$titleInfo[$index]['titleID']  	= $results->titleID;

        		 		$index++;
      		 	}
     		}
     		else
     		{
       			$titleInfo = 'Error connecting to database.';
     		}

     		return $titleInfo;
   	}

   	public function getDonorInfo($ID)
   	{
     		$infoArray = array();

     		$this->db->select();
     		$this->db->from('tbl_donorinfo');
     		$this->db->where('donorID', $ID);

     		$query = $this->db->get();

     		foreach ($query->result() as $result)
    		{
    			  $infoArray['titleID'] 		= $result->titleID;
    	   		$infoArray['FirstName'] 	= $result->FirstName;
    	   		$infoArray['LastName']	 	= $result->LastName;
    	   		$infoArray['Address1'] 		= $result->Address1;
    	   		$infoArray['Address2'] 		= $result->Address2;
    	   		$infoArray['City'] 			= $result->City;
    	   		$infoArray['State'] 		= $result->State;
    	   		$infoArray['PostalCode'] 	= $result->PostalCode;
    	   		$infoArray['phone'] 		= $result->phone;
    	   		$infoArray['email'] 		= $result->email;
    		}

     		return $infoArray;
   	}


} // SearchModel