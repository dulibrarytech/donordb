/*
 * Donor Application
 *
 * Utility Functions
 *
 * Author: Jeff Rynhart
 * 
 * University of Denver, June 2013
 */

function doAjax(ajaxObj) {

	$.ajax(ajaxObj);
};

function submitLName(form) {

	var lname = $("#input-box").val();
	
	if(lname == "")
		alert("Please enter a last name");

	// Try to use the form submit in html, and form.submit() here 
	else
	{
		var test = $.post();
		alert(test);
	}	
}

function submitDate(response) {

	alert(response);
}

