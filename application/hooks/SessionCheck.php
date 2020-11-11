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
	require 'SimpleLogger.php';
	$logger = new SimpleLogger();
        $logger->log("Class: " . $CI->router->class);
        $logger->log("Method: " . $CI->router->method);

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
    		    //if($CI->router->class == 'livinglibrary' && $CI->router->method != 'index') 
                    //{
                    //    redirect('livinglibrary');
                    //}
                    //else if($CI->router->class != 'livinglibrary') 
                    //{
                    redirect('search');
                    //}
    		}	
    	}
    }
}
