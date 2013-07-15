<?php
/*
 * Donor Application
 *
 * editModel - functions related to data entry
 *
 * Author: Jeff Rynhart
 * 
 * University of Denver, July 2013
 */
 
class editModel extends CI_Model 
{

	function __construct() 
    {
        parent::__construct();
        $this->load->database();
    }

    public function createDonorRecord($newDonorData)
    {
    	$ID = 0;

        $titleID = $this->getTitleID($newDonorData['title']);

        $country = "USA";
        if($newDonorData['country'] != "")
            $country = $newDonorData['country'];

        $data = array(

            'titleID'       => $titleID,
            'FirstName'     => $newDonorData['fName'],
            'LastName'      => $newDonorData['lName'],
            'Organization'  => $newDonorData['org'],
            'Address1'      => $newDonorData['addr1'],
            'Address2'      => $newDonorData['addr2'],
            'City'          => $newDonorData['city'],
            'State'         => $newDonorData['state'],
            'PostalCode'    => $newDonorData['zip'],
            'Country'       => $country,
            'phone'         => $newDonorData['phone'],
            'email'         => $newDonorData['email']
        );

        // If the db insert operation is successfull, get the ID of the new record
        if($this->db->insert('tbl_donorinfo', $data))
            $ID = $this->db->insert_id();

        return $ID;
    }

    public function createGiftRecord($donorID, $newGiftData)
    {
    	$ID = 0;

        $data = array(

            'donorID'           => $donorID,
            'dateOfGift'        => $newGiftData['giftDate'],
            'numberOfGifts'     => $newGiftData['giftQuantity'],
            'letter'            => 1,
            'important'         => ($newGiftData['importantFlag'] == "on") ? 1 : 0
        );

        if($this->db->insert('tbl_donorgifts', $data))
        {
            $ID = $this->db->insert_id();

            $desc = array(

                'giftsID'           => $ID,
                'giftDescription1'  => $newGiftData['giftDescription']
            );

            // If something happens here, fail
            if(!$this->db->insert('tbl_donorgiftdescriptions', $desc))
                $ID = 0;
        }
            
        return $ID;
    }

    private function getTitleID($titleText)
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

} // editModel