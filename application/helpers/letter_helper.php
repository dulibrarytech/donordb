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
	<div style='float: right;'>
		<img src='" . base_url() . "img/lheader.jpg' height = '85px' />
	</div>
	</div>

	<div style = 'height: 740px;'>

		" . $data['currentDate'] . " <br /><br />"
		. $data['titleString'] . " " . $data['firstName'] . " " . $data['lastName'] . "<br />";

		if($data['org'] != "") { $letterBody .= $data['org'] . "<br />"; }

		$letterBody .= $data['addr1'] . "<br />";

		if($data['addr2'] != "") { $letterBody .= $data['addr2'] . "<br />"; }

		$letterBody .= $data['city'] . ", " . $data['state'] . " " . $data['zip'] . "<br />"; 

		if($data['country'] != "" && $data['country'] != "USA") { $letterBody .= $data['country'] . "<br />"; }

		$letterBody .= "<br/><br/>

		Dear " . $data['titleString'] . " " . $data['lastName'] . ",<br/><br/>
		I would like to thank you for your generous donation to the Penrose Library.
		Your gift of " . $data['giftDescription'] . ", 
		which we received on " . $data['giftDate'] . ", is much appreciated.
		Penrose Library has not provided you with any payment, or services in exchange for your gift; 
		we do, however, convey our sincere appreciation for your contribution - it has enhanced the library's resources.
		<br/><br/>
		While academic departments in the University of Denver have support from parents and 
		alumni, the Penrose Library relies on its friends.  We are pleased to count you among our 
		friends, and we hope we can count on your friendship in future years.
		<br/><br/>
		Again, I thank you for your generous support of the University of Denver Penrose Library.
		<br/><br/>
		Sincerely,
		<br/><br/>

		<img src='" . base_url() . SIG_IMG_READER . "' height = '85px' /><br/>
		Nancy Allen
		<br/>
		Dean and Director

	</div>

	<div style='padding-top: 10px;'>
		<img src='" . base_url() . "img/lfooter.jpg' width = '400px'/>
	</div>

	</body>";

	echo $letterBody;
}

