<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/*
 * Donor Application
 *
 * Session Validation Hook Class
 *
 * Author: Jeff Rynhart
 * 
 * University of Denver, June 2013
 */

class SessionCheck 
{
	//require_once "/libraries/auth/phpsessions.php";

	function __construct() 
    {

    }

    function isSessionValid() 
    {
    	$CI =& get_instance();
    	if($CI->router->class == 'login' || ($CI->router->class == 'search' && $CI->router->method == 'index'))
    	{
    		return;
    	}
    	else
    	{
    		$phpsessions = new Phpsessions();
    		$userProfile = $phpsessions->get("donorDB_profile");

    		if($userProfile == null || $userProfile["isValid"] === false)
    		{
    			//header("HTTP/1.1 403 Forbidden");    // TODO: redirect to search?  Test it first
        		//die();
                redirect('search');
    		}	
    	}
    }
}