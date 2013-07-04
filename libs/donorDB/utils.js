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
		$.ajax(ajaxObj);
	};

	getDonorDataArray = function(callback) {

		var resultTable;

		requestObj = {

			type: "POST", 
			url: _searchUrl + '/queryDatabaseAllDonors',
			dataType: "json",
			cache: true,
			success: function (response) {
				callback(response);
			},
			error: function ( textStatus, errorThrown ) {
                alert( errorThrown );
            }
		};

		doAjax(requestObj);
	};

	submitSearch = function(callback) {

		searchForm = "#search-form";

		requestObj = {

			type: "POST", 
			url: _searchUrl + '/recordSearch',
			data: $(searchForm).serialize(),
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

	getTitleArray = function(callback) {

		requestObj = {

			type: "POST", 
			url: _searchUrl + '/queryDatabaseAllTitles',
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

		getDonorDataArray: function(callback) {
			getDonorDataArray(callback);
		},
		submitSearch: function(callback) {	
			submitSearch(callback);
		},
		getTitleArray: function(callback) {
			getTitleArray(callback);
		}
	};

}(jQuery));

