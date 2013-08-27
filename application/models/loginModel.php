<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class loginModel extends CI_Model 
{

    public function __construct() 
    {
        parent::__construct();

        // $this->load->library("encryption/encrypt");
        // $this->salt = $this->config->item("encryption_key");
        // $this->load->driver('cache', array('adapter' => 'apc'));
    }

    public function authenticate($post) 
    {
    	if (!is_array($post) || empty($post)) 
    	{
            return header("HTTP/1.1 404 Not Found");
        }

        $userName = strip_tags(trim($post["userName"]));
        $passWord = strip_tags(trim($post["passWord"]));
        $response = array();
    }

}