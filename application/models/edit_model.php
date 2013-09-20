<?php
/*
 * Donor Application
 *
 * Edit_model - functions related to data entry
 *
 * Author: Jeff Rynhart
 * 
 * University of Denver, July 2013
 */
 
class Edit_model extends CI_Model 
{

	function __construct() 
    {
        parent::__construct();
        $this->load->database();
        $this->load->model('Search_model');
    }

    public function createDonorRecord($newDonorData)
    {
    	$ID = 0;

        //$titleID = $this->Search_model->getTitleID($newDonorData['title']);

        $country = "USA";
        if($newDonorData['country'] != "")
            $country = $newDonorData['country'];

        $data = array(

            'titleID'       => $newDonorData['title'],//$titleID,
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

        if(isset($newDonorData['anonymousFlag']))
            $data['anonymous'] = $newDonorData['anonymousFlag'];

        // If the db insert operation is successfull, get the ID of the new record
        if($this->db->insert('tbl_donorinfo', $data))
            $ID = $this->db->insert_id();

        return $ID;
    }

    public function createGiftRecord($donorID, $newGiftData)
    {
    	$ID = 0;

        if(!isset($newGiftData['letterFlag']))
            $newGiftData['letterFlag'] = 1;

        $data = array(

            'donorID'           => $donorID,
            'dateOfGift'        => $newGiftData['giftDate'],
            'numberOfGifts'     => $newGiftData['giftQuantity'],
            'letter'            => $newGiftData['letterFlag'],
            'important'         => $newGiftData['importantFlag']
        );

        // TODO: Join tables, then do an insert (Future-not required)
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

    public function editGiftRecord($giftID, $giftData)
    {
        $success = 0;

        $data = array(

            'tbl_donorgifts.dateOfGift'         => $giftData['giftDateEdit'],
            'tbl_donorgifts.numberOfGifts'      => $giftData['giftQuantity'],
            'tbl_donorgiftdescriptions.giftDescription1'  => $giftData['giftDescription'],
            'tbl_donorgifts.important'          => $giftData['importantFlag']
        );

        $this->db->where('tbl_donorgifts.giftsID', $giftID);
        $success = $this->db->update('tbl_donorgiftdescriptions join tbl_donorgifts on tbl_donorgiftdescriptions.giftsID = tbl_donorgifts.giftsID', $data);

        return $success;
    }

    public function editDonorRecord($donorID, $donorData)
    {
        $success = 0;

        $data = array(

            'titleID'        => $donorData['title'],
            'FirstName'      => $donorData['fName'],
            'LastName'       => $donorData['lName'],
            'Organization'   => $donorData['org'],
            'Address1'       => $donorData['addr1'],
            'Address2'       => $donorData['addr2'],
            'City'           => $donorData['city'],
            'State'          => $donorData['state'],
            'PostalCode'     => $donorData['zip'],
            'Country'        => $donorData['country'],
            'phone'          => $donorData['phone'],
            'email'          => $donorData['email']
        );

        $this->db->where('donorID', $donorID);
        $success = $this->db->update('tbl_donorinfo', $data);

        return $success;
    }

    public function addTitle($title)
    {
        $ID = 0;

        $data = array(

            'title' => $title
        );

        // If the db insert operation is successfull, get the ID of the new record
        if($this->db->insert('tbl_donortitle_lkup', $data))
            $ID = $this->db->insert_id();

        return $ID;
    }

    public function setLetterAsSent($giftID)
    {
        $success = 0;

        $data = array(

            'tbl_donorgifts.letter'          => 0
        );

        $this->db->where('tbl_donorgifts.giftsID', $giftID);
        $success = $this->db->update('tbl_donorgifts', $data);

        return $success;
    }

} // Edit_model