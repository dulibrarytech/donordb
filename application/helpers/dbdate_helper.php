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
	$date = date("F j, Y");

	// if($date[3] == "0")
	// 	$date = substr_replace($date,"",3,1);

	// if($date[0] == "0")
	// 	$date = ltrim($date,"0");

	return $date;
}

function formatLetterDate($date)
{
	//return DateTime($date)->format("F j, Y");
	$month 	= substr($date, 5, -3);
	$day 	= substr($date, 8, 11);
	$year 	= substr($date, 0, -6);

	$datetime = new DateTime();
	$datetime->setDate($year, $month, $day);
	//$newDate = date("F j, Y", $date);
	return $datetime->format("F j, Y");
}

function convertDBDateToNormalFormat($date)
{
	$month 	= substr($date, 5, -3);
	$day 	= substr($date, 8, 11);
	$year 	= substr($date, 0, -6);

	if($month[0] == "0")
		$month = ltrim($month,"0");

	if($day[0] == "0")
		$day = ltrim($day,"0");

	return $month . "/" . $day . "/" . $year;
}