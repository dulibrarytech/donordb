<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Codetest extends CI_Controller 
{

	function __construct() 
    {
        parent::__construct();

        $this->load->helper('sanitizer');
    }

    public function index()
	{
		$arr = array();
		$arr['postIndex1'] = "Index1";
		$arr['postIndex2'] = "<a href='bad ref'></a>";
		$arr['postIndex3'] = "Index3";

		$sanarr = sanitizePost($arr);

		foreach($sanarr as $key => $postValue)
        {
            printf($key . " : " . $postValue . "<br />"); 
        }
	}

}