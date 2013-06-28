/*
 * Donor Application
 *
 * Functions to generate tables for specific views
 *
 * Author: Jeff Rynhart
 * 
 * University of Denver, June 2013
 */
tables = (function($) {

	buildBrowseAllTable = function(responseObj) {

		var results = "";

		results = '<table class="table table-bordered table-striped">';

		$.each(responseObj, function (key, value) {
			
			results += '<tr>';
			results += '<td class="span2" style="text-align: center"> <a href="' + _editUrl + '/editDonor/' + value.donorID + '">Edit</a> </td>';

			results += '<td class="span4">' + value.firstName + '</td>';
			results += '<td class="span4">' + value.lastName + '</td>';

			results += '<td style="text-align: center"> <a href="' + _editUrl + '/addGift/' + value.donorID + '">Add Gift</a> </td>';
			results += '</tr>';

		} );

		results += '</table>';

		return results;
	};

	buildDonorSearchResultsTable = function(responseObj) {

		var results = "";

		return results;
	}

	buildGiftSearchResultsTable = function(responseObj) {

		var results = "";

		return results;
	}

	return {

		buildBrowseAllTable: function(responseObj) {	
			return buildBrowseAllTable(responseObj);
		},
		buildDonorSearchResultsTable: function(responseObj) {	
			loadDonor(donorID);
		}
	};

}(jQuery));






	
