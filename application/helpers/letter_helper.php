<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/*
 * Donor Application - Letter Template
 *
 * Author: Jeff Rynhart
 * 
 * University of Denver, September 2013
 */

function generateLetter($data)
{
	$letterBody = "

	<title>Letter to " . $data['firstName'] . " " . $data['lastName'] . "</title>

	<body>

	<div style='height: 75px;'>
	DATE <br />"
	. $data['titleString'] . " " . $data['firstName'] . " " . $data['lastName'] . "<br />"
	. $data['org']  . "


	</div>
	</body>

	";

	echo $letterBody;
}