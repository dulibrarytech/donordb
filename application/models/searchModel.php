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

    function keywordSearch($keyword)
   	{
   		$this->db->select('donorID, FirstName, LastName');
 		$this->db->from('tbl_donorinfo');
 		$this->db->like('LastName', $keyword);		// *** Search by last name by default.  May add options later *** //
 		$this->db->order_by('LastName');
 		
 		$query = $this->db->get();
 		$resultsTable = "";

 		// if ($query->num_rows() > 0)
 		// { 	
		 // 	foreach ($query->result() as $results)
		 // 	{
		 // 		$resultsTable .= "<tr>";
		 // 		$resultsTable .= "<td>";
		 // 		$resultsTable .= anchor("edit/editDonor/" . $results->donorID, "Edit");
		 // 		$resultsTable .= "&nbsp;";
		 // 		$resultsTable .= "</td>";
		 // 		$resultsTable .= "<td>";
		 // 		$resultsTable .= $results->FirstName;
		 // 		$resultsTable .= "</td>";
		 // 		$resultsTable .= "<td>";
		 // 		$resultsTable .= $results->LastName;
		 // 		$resultsTable .= "</td>";
		 // 		$resultsTable .= "<td>";
		 // 		$resultsTable .= "&nbsp;";
		 // 		$resultsTable .= anchor("edit/addGift/" . $results->donorID, "Add Gift");
		 // 		$resultsTable .= "</td>";
		 // 		$resultsTable .= "</tr>";
		 // 	}
		 		
 		// 	return $resultsTable;
 		// }
 		// else
 		// {
 		// 	return 'No results found.';
 		// }

		return $resultsTable;
   	}

   	function dateSpanSearch($from, $to)
   	{

   	}

   	function browseAllDonors()
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
		 		if($results->FirstName == "" || $results->LastName == "")
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

   	function getDonorInfo($ID)
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