<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/*
 * Donor Application - Edit Functions
 *
 * Author: Jeff Rynhart
 * 
 * University of Denver, May 2013
 */

// Removes the timestamp from the date string
function truncateDateString($dateString)
{
    return substr($dateString,0,-9);
}

function getCurrentDate() 
{
	return date("m/d/Y");
}

function convertDateToNormalFormat($date)
{
	return substr($date, 5, -3) . "/" . substr($date, 9, 2) . "/" . substr($date, 0, -6);
}