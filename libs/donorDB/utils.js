/*
 * Donor Application
 *
 * Utility Functions
 *
 * Author: 
 * 
 * University of Denver, June 2013
 */

function doAjax(ajaxObj) {

	$.ajax(ajaxObj);
};

function submitLName() {

	//$("last-name-input").validate();
	var lname = $("#input-box").val();
	
	if(lname == "")
		alert("Please enter a last name");

	else
		location.href = _searchUrl + "/donorSearch?keyword=" + lname;
}

function submitDate(response) {

	alert(response);
}

