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
		getDonorDataArray,
		submitSearch,
		submitNewDonorInfo,
		submitGift,
		getGiftData,
		getActiveNameString,
		getCurrentDate,
		getTitleArray,
		getCurrentDate,
		getGiftDatesForActiveDonor;

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
				addNewDonorView.toggleSubmitMessage();
				addNewDonorView.resetForm();
			},
			error: function ( textStatus, errorThrown ) {
                alert( errorThrown );
            }
		};
		
		doAjax(requestObj);
		addNewDonorView.toggleSubmitMessage();
	};

	submitGift = function() {

		requestObj = {

			type: "POST", 
			url: _editUrl + '/addGift',
			data: $("#add-gift-form").serialize(),
			dataType: "text",
			cache: true,
			success: function(response) {
				alert(response);
				addGiftView.toggleSubmitMessage();
				addGiftView.resetForm();
			},
			error: function ( textStatus, errorThrown ) {
                alert( errorThrown );
            }
		};
		
		doAjax(requestObj);
		addGiftView.toggleSubmitMessage();
	};

	getGiftData = function(callback) {

		requestObj = {

			type: "POST", 
			url: _searchUrl + '/queryDatabaseGiftData',
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

	getCurrentDate = function() {

		var date = new Date(),
			month = date.getMonth() + 1; 

		if(month < 10)
			month = "0" + month;

		return date.getFullYear() + "-" + month + "-" + date.getDate();
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

	getGiftDatesForActiveDonor = function(callback) {

		requestObj = {

			type: "POST", 
			url: _searchUrl + '/queryDatabaseDonorGifts',
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
		getGiftData: function(callback) {		
			getGiftData(callback);
		},
		getTitleArray: function(callback) {
			getTitleArray(callback);
		},
		getActiveNameString: function(callback) {
			getActiveNameString(callback);
		},
		getCurrentDate: function() {
			return getCurrentDate();
		},
		getGiftDatesForActiveDonor: function(callback) {
			getGiftDatesForActiveDonor(callback);
		}
	};

}(jQuery));

