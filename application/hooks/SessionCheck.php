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
	function __construct() 
    {

    }

    function isSessionValid() 
    {
    	$CI =& get_instance();
    	if($CI->router->class == 'login' || 
            $CI->router->class == 'codetest' || 
            ($CI->router->class == 'search' && $CI->router->method == 'index') ||
	        $CI->router->class == 'livinglibrary')
    	{
    		return;
    	}
    	else
    	{
    		$phpsessions = new Phpsessions();
    		$userProfile = $phpsessions->get("donorDB_profile");

    		if($userProfile == null || $userProfile["isValid"] === false)
    		{
                redirect('search');
    		}	
    	}
    }
}
