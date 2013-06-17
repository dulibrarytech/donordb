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

function submitLName() {

	var lname = $("#input-box").val();
	
	if(lname == "")
		alert("Please enter a last name");

	else
		location.href = _searchUrl + "/donorSearch?keyword=" + lname;	
}

function submitDate(response) {

	alert(response);
}

function loginForm() {

	// TODO: disable lname and date submit.  remove menubar links.  re-activate them in a function called upon authentication success
}