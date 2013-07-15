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
		submitNewDonorInfo,
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

	submitSearch = function(callback,type) {

		var searchForm = "#search-form";

		requestObj = {

			type: "POST", 
			url: _searchUrl + '/recordSearch',
			data: $(searchForm).serialize() + "&searchType=" + type,
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

	submitNewDonorInfo = function() {
			
		requestObj = {

			type: "POST", 
			url: _editUrl + '/inputDonorInfo',
			data: $("#donor-input-form").serialize(),
			dataType: "text",
			cache: true,
			success: function(response) {
				alert(response);
				//views.toggleSubmitMessage();
			},
			error: function ( textStatus, errorThrown ) {
                alert( errorThrown );
            }
		};
		
		doAjax(requestObj);
		//views.toggleSubmitMessage();
	};

	submitGift = function() {

		//alert($("#donor-input-form").serialize());
		requestObj = {

			type: "POST", 
			url: _editUrl + '/addGift',
			data: $("#donor-input-form").serialize(),
			dataType: "json",
			cache: true,
			success: function(response) {
				alert(response);
				//views.toggleSubmitMessage();
			},
			error: function ( textStatus, errorThrown ) {
                alert( errorThrown );
            }
		};
		
		doAjax(requestObj);
		//views.toggleSubmitMessage();
	};

	resetSearch = function() {

		window.location.href = _searchUrl;
	};

	getActiveNameString = function(callback) {

		requestObj = {

			type: "POST", 
			url: _searchUrl + '/getActiveDonorNameString',
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
		submitSearch: function(callback,type) {	
			submitSearch(callback,type);
		},
		submitNewDonorInfo: function() {		
			submitNewDonorInfo();
		},
		submitGift: function() {		
			submitGift();
		},
		resetSearch: function() {	
			resetSearch();
		},
		getTitleArray: function(callback) {
			getTitleArray(callback);
		},
		getActiveNameString: function(callback) {
			getActiveNameString(callback);
		}
	};

}(jQuery));

