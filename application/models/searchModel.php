<?php
/*
 * Created on Dec 13, 2007 - f.r.
 *
 * search model
 * handles requests sent from application FORMS
 */
 
class searchModel extends CI_Model 
{
    function __construct() 
    {
        parent::__construct();
        $this->load->database();
    }

    public function donorSearch($keyword,$fromDate,$toDate)
   	{
   		$searchResults = array();
   		$index = 0;

   		// If date values are null, be sure to include all gifts
   		// if($fromDate == null)
   		// 	$fromDate = "1900-01-01";
   		// if($toDate == null)
   		// 	$toDate =  // Current date

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
		 		// if($results->FirstName == "" && $results->LastName == "" && $results->Organization == "")
		 		// 	continue;

		 		if($this->dateScreen($results->donorID,$fromDate,$toDate))
		 		{
			 		$searchResults[$index]['firstName']		= $results->FirstName;
			 		$searchResults[$index]['lastName']		= $results->LastName;
			 		$searchResults[$index]['donorID']		= $results->donorID;

			 		$index++;
			 	}
		 	}
		 		
 			return $searchResults;
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
		 		}
 			}
 			else
 			{
 				return 'No results found.';
 			}
 		}

		return $searchResults;
   	}

   	public function giftsearch($keyword)
   	{
   		return "gift search model";
   	}

   	private function dateScreen($donorID,$fromDate,$toDate)
   	{
   		$giftsInRange = false;

   		$this->db->select('giftsID');
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
 			return 'Error connecting to database.';
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
 			return 'Error connecting to database.';
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