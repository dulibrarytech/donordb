<?php
/*
 * Donor Application - Title Db Model Functions
 *
 * Author: Jeff Rynhart
 * 
 * University of Denver, May 2013
 */
 
class titleModel extends CI_Model 
{
    function __construct() 
    {
        parent::__construct();
        $this->load->database();
    }

    function listAllTitles()
 	{
 		$donorTitles = array();
 		$this->db->select('titleID, title');
 		$this->db->from('tbl_donortitle_lkup');
 		$query = $this->db->get();
 		 		 
 		if ($query->num_rows() > 0)
 		{		
 		 	foreach ($query->result() as $results)
		 	{
		 		$donorTitles[$results->titleID] = $results->title;
		 	}
 		}		
 		return $donorTitles;		
 	}

 	function createTitleTable()
 	{
 		$this->db->select('titleID, title');
 		$this->db->from('tbl_donortitle_lkup');
 		$query = $this->db->get();

 		$resultsTable = "";

 		if ($query->num_rows() > 0)
 		{		
 		 	foreach ($query->result() as $results)
		 	{
		 		$resultsTable .= "<tr>";
		 		$resultsTable .= "<td class='span3' style='text-align: center;'>";
		 		$resultsTable .= anchor("edit/editTitle", "Edit");
		 		$resultsTable .= "&nbsp;";
		 		$resultsTable .= "</td>";
		 		$resultsTable .= "<td>";
		 		$resultsTable .= $results->title;
		 		$resultsTable .= "</td>";
		 		$resultsTable .= "</tr>";
		 	}

		 	return $resultsTable;
 		}
 		else
 		{
 			return 'No results found.';
 		}	
 	}

} // titleModel