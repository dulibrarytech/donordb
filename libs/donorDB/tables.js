/*
 * Donor Application
 *
 * Functions to generate tables for specific views
 *
 * Author: Jeff Rynhart
 * 
 * University of Denver, June 2013
 */

function loadAllDonors() {

	var requestObj = {

    		type: 		"POST",
    		//url: 		donorDB.configObj._searchUrl . "queryDatabaseAllDonors",
    		url: 		_searchUrl + "/queryDatabaseAllDonors",
    		dataType: 	"json",
    		cache: 		true,
    		success: 	function (response) {
    						buildBrowseAllTable(response);
    					},
    		error: 		function(textStatus, errorThrown) {
    						alert( errorThrown );
    					}
    	};
  
    	$("#table-content").html("<h2><center>Loading...</center></h2>");

    	doAjax(requestObj);
}

function buildBrowseAllTable(responseObj) {

	var results = "";

	results = '<table class="table table-bordered table-striped">';

	$.each(responseObj, function (key, value) {
		
		results += '<tr>';
		results += '<td class="span2" style="text-align: center"> <a href="' + _editUrl + '/editDonor/' + value.donorID + '">Edit</a> </td>';

		results += '<td class="span4">' + value.firstName + '</td>';
		results += '<td class="span4">' + value.lastName + '</td>';

		results += '<td style="text-align: center"> <a href="' + _editUrl + '/addGift/' + value.donorID + '">Add Gift</a> </td>';
		results += '<tr>';

	} );

	results += '</table>';

	$("#table-content").html(results);
};






	
