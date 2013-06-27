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

function submitSearch(form) {

	var searchType 	= $('input:radio[name=searchType]:checked').val(),
	    lastName 	= $('#lname_input_box').val(),
	    fromDate 	= $('#fromDate').val(),
	    toDate 		= $('#toDate').val();

	if(lastName == "" && fromDate == "" && toDate == "") 
		alert("Please enter a last name or set a date range");
	else
	{

	}
	
}









