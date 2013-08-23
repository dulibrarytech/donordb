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
	require_once "/libraries/auth/phpsessions.php";

	function __construct() 
    {

    }

    function isSessionValid() 
    {
    	$CI =& get_instance();
    	if($CI->router->class == 'Login' || $CI->router->class == 'Start')
    	{
    		return;
    	}
    	else
    	{
    		$phpsessions = new Phpsessions();
    		$userProfile = $phpsessions->get("user");

    		if($userProfile == null || $userProfile->isValid === false)
    		{
    			header("HTTP/1.1 403 Forbidden");
        		die();
    		}	
    	}
    }
}