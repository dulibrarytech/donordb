<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Login_model extends CI_Model 
{

    public function __construct() 
    {
        parent::__construct();
    }

    /**
     * authenticates user via ldap or active directory based on username
     * @param userName
     * @param passWord
     */
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