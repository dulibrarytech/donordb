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

        // Bug 500: Leave double and single quotes in the gift description and details fields.  Must leave other sanitization in place
        $newDonorData['giftDescription'] = str_ireplace("&#039;", "'", $newDonorData['giftDescription']);
        $newDonorData['giftDescription'] = str_ireplace('&quot;', '"', $newDonorData['giftDescription']);

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

        // Bug #500: Leave double and single quotes in the gift description and details fields.  Must leave other sanitization in place
        // $newGiftData['giftDescription'] = str_ireplace("&#039;", "'", $newGiftData['giftDescription']);
        // $newGiftData['giftDescription'] = str_ireplace('&quot;', '"', $newGiftData['giftDescription']);
        // $newGiftData['giftDetails'] = str_ireplace("&#039;", "'", $newGiftData['giftDetails']);
        // $newGiftData['giftDetails'] = str_ireplace('&quot;', '"', $newGiftData['giftDetails']);

        if(!isset($newGiftData['letterFlag']))
            $newGiftData['letterFlag'] = 1;

        $data = array(

            'donorID'           => $donorID,
            'dateOfGift'        => $newGiftData['giftDate'],
            'numberOfGifts'     => removeNonNumericChars($newGiftData['giftQuantity']),
            'letter'            => $newGiftData['letterFlag'],
            'important'         => $newGiftData['importantFlag'],
            'bypassLetter'      => $newGiftData['skipLetterFlag']
        );

        // TODO: Join tables, then do an insert (Future-not required)
        if($this->db->insert('tbl_donorgifts', $data))
        {
            $ID = $this->db->insert_id();

            $desc = array(

                'giftsID'           => $ID,
                'giftDescription1'  => $newGiftData['giftDescription'],
                'giftDetails'       => $newGiftData['giftDetails']
            );

            // If something happens here, bail
            if(!$this->db->insert('tbl_donorgiftdescriptions', $desc))
                $ID = 0;
        }

        return $ID;
    }

    public function editGiftRecord($giftID, $giftData)
    {
        $success = 0;

        // Bug #500: Leave double and single quotes in the gift description and details fields.  Must leave other sanitization in place
        $giftData['giftDescription'] = str_ireplace("&#039;", "'", $giftData['giftDescription']);
        $giftData['giftDescription'] = str_ireplace('&quot;', '"', $giftData['giftDescription']);
        $giftData['giftDetails'] = str_ireplace("&#039;", "'", $giftData['giftDetails']);
        $giftData['giftDetails'] = str_ireplace('&quot;', '"', $giftData['giftDetails']);

        // Build database update array
        $data = array(

            'tbl_donorgifts.dateOfGift'         => $giftData['giftDateEdit'],
            'tbl_donorgifts.numberOfGifts'      => $giftData['giftQuantity'],
            'tbl_donorgiftdescriptions.giftDescription1'  => $giftData['giftDescription'],
            'tbl_donorgifts.important'          => $giftData['importantFlag'],
            'tbl_donorgifts.bypassLetter'       => $giftData['skipLetterFlag']
        );

        /* Letter Automation 
         *
         * With a gift data edit, updates need to be made based not only on user input (giftData), but on the state of existing database variables:
         *
         * 1. If the important flag is being set on this edit, and was previously not set, make sure the letter flag is set, so external relations will get a notification
         * 
         * 2. If the bypass letter flag is being set on this edit, and was not previously set, the letter flag should go to 1.
         *     this way, if the bypass is ever removed, a letter request will be sent
         */
        $prevImportantFlag = 1;
        $prevBypassFlag = 1;
        $this->db->select('important, bypassLetter');
        $this->db->from('tbl_donorgifts');
        $this->db->where('giftsID', $giftID);
        $query = $this->db->get();
        if ($query->num_rows() > 0)
        {   
            foreach ($query->result() as $result)
            {
                $prevImportantFlag = $result->important;
                $prevBypassFlag = $result->bypassLetter;
            }
        } 
        $importantFlagSet = ($prevImportantFlag == 0 && $giftData['importantFlag'] == 1);
        $bypassFlagSet = ($prevBypassFlag == 0 && $giftData['skipLetterFlag'] == 1);    
        if($importantFlagSet || $bypassFlagSet) 
        {
            $data['tbl_donorgifts.letter'] = 1;
            log_message('info', 'flag update: gift record ' . $giftID . ' updated, letter request being sent.');
        }

        // Update the database
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

        // Only set letter as 'sent' if it has not been bypassed.  This enables generating a letter on a bypassed gift, for any purpose, without changing the sent status of a gift.
        $bypassFlag = 0;
        $this->db->select('bypassLetter');
        $this->db->from('tbl_donorgifts');
        $this->db->where('giftsID', $giftID);
        $query = $this->db->get();
        if ($query->num_rows() > 0)
        {   
            foreach ($query->result() as $result)
            {
                $bypassFlag = $result->bypassLetter;
            }
        } 

        if($bypassFlag == 0)
        {
            $data = array(

                'tbl_donorgifts.letter'          => 0
            );

            $this->db->where('tbl_donorgifts.giftsID', $giftID);
            $success = $this->db->update('tbl_donorgifts', $data);

            if($success)
                log_message('info', 'letter set as sent for giftID ' + $giftID);
        }

        return $success;
    }

    public function setLetterAsPending($giftID)
    {
        $success = 0;

        $data = array(

            'tbl_donorgifts.letter'          => 1
        );

        $this->db->where('tbl_donorgifts.giftsID', $giftID);
        $success = $this->db->update('tbl_donorgifts', $data);

        if($success)
            log_message('info', 'letter set as pending for giftID ' + $giftID);

        return $success;
    }

} // Edit_model