/*
 * Donor Application
 *
 * Utility Functions
 *
 * Author: Jeff Rynhart
 * 
 * University of Denver, June 2013
 */

utils = (function($) {

	var doAjax,
		requestAllDonorData,
		submitSearch,
		getTitleArray;

	doAjax = function(ajaxObj) {
		alert("ajax");
		$.ajax(ajaxObj);
	};

	requestAllDonorData = function() {

		var resultTable;

		requestObj = {

			type: "POST", 
			url: _searchUrl + '/queryDatabaseAllDonors',
			dataType: "json",
			cache: true,
			success: function (response) {

				resultTable = tables.buildBrowseAllTable(response);
				browseDonorsView.setLayout(resultTable);
			},
			error: function ( textStatus, errorThrown ) {
                alert( errorThrown );
            }
		};

		doAjax(requestObj);
	};

	submitSearch = function(form) {

		var searchType 	= $('input:radio[name=searchType]:checked').val(),
		    lastName 	= $('#lname_input_box').val(),
		    fromDate 	= $('#fromDate').val(),
		    toDate 		= $('#toDate').val();

		if(lastName == "" && fromDate == "" && toDate == "") 
			alert("Please enter a last name or set a date range");
		else
		{

		}
		
	};

	getTitleArray = function(callback) {

		alert("gta");
		requestObj = {

			type: "POST", 
			url: _searchUrl + '/getTitleList',
			dataType: "json",
			cache: true,
			success: function(response) {
				callback(response);
			},
			error: function ( textStatus, errorThrown ) {
                alert( errorThrown );
            }
		};

		doAjax(requestObj);
	};

	return {

		requestAllDonorData: function() {
			requestAllDonorData();
		},
		submitSearch: function(form) {	
			submitSearch(form);
		},
		getTitleArray: function() {
			getTitleArray();
		},
		doAjax: function(requestObj) {
			doAjax(requestObj);
		}
	};

}(jQuery));

