<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Codetest extends CI_Controller 
{

	function __construct() 
    {
        parent::__construct();

        //$this->load->helper('sanitizer');
    }

    public function index()
	{
		echo "A man, a plan, a canal: Panama."
	}
}