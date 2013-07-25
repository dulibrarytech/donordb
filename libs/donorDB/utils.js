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

		submitSearch,
		submitNewDonorInfo,
		submitGift,
		submitDonorEdit,
		submitGiftEdit,
		submitNewTitle,
		getDonorDataArray,
		getActiveDonorData,
		getGiftData,
		getActiveNameString,
		getCurrentDate,
		getTitleArray,
		getGiftDatesForActiveDonor,
		setActiveGift;

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

	getActiveDonorData = function(callback) {

		requestObj = {

			type: "POST", 
			url: _searchUrl + '/queryDatabaseDonorData',
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
				addNewDonorView.setMessage(response);
				setTimeout( function(){ addNewDonorView.toggleSubmitMessage(); }, 4000 );
			},
			error: function ( textStatus, errorThrown ) {
                alert( errorThrown );
            }
		};
		
		doAjax(requestObj);
	};

	submitNewTitle = function(title,callback) {

		requestObj = {

			type: "POST", 
			url: _editUrl + '/addTitle',
			data: {"title" : title},
			dataType: "json",
			cache: true,
			success: function(response) {
				//alert(response['message']);
				callback(title,response['ID']); 
			},
			error: function ( textStatus, errorThrown ) {
                alert( errorThrown );
            }
		};
		
		doAjax(requestObj);
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

	submitGiftEdit = function() {

		requestObj = {

			type: "POST", 
			url: _editUrl + '/inputGiftEdit',
			data: $("#add-gift-form").serialize(),
			dataType: "text",
			cache: true,
			success: function(response) {
				alert(response);
				editGiftView.toggleSubmitMessage();
			},
			error: function ( textStatus, errorThrown ) {
                alert( errorThrown );
            }
		};
		
		doAjax(requestObj);
		editGiftView.toggleSubmitMessage();
	};

	submitDonorEdit = function() {

		requestObj = {

			type: "POST", 
			url: _editUrl + '/inputDonorEdit',
			data: $("#donor-input-form").serialize(),
			dataType: "text",
			cache: true,
			success: function(response) {
				editDonorView.setMessage(response);
				setTimeout( function(){ editDonorView.toggleSubmitMessage(); }, 4000 );
			},
			error: function ( textStatus, errorThrown ) {
                alert( errorThrown );
            }
		};
		
		doAjax(requestObj);
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

	getTitleArray = function(callback,index) {

		requestObj = {

			type: "POST", 
			url: _searchUrl + '/queryDatabaseAllTitles',
			dataType: "json",
			cache: true,
			success: function(response) {
				callback(response,index);
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

	setActiveGift = function(giftID,callback) {

		requestObj = {

			type: "POST", 
			url: _editUrl + '/setSessionActiveGift/' + giftID,
			dataType: "text",
			cache: true,
			success: function(response) {

				if(response == "ID set")
					getGiftData(callback);
				else {
					editGiftView.blockForm(response);
				}

			},
			error: function ( textStatus, errorThrown ) {
                alert( errorThrown );
            }
		};
		
		doAjax(requestObj);
	};

	return {

		submitSearch: function(callback,type) {	
			submitSearch(callback,type);
		},
		submitNewDonorInfo: function() {		
			submitNewDonorInfo();
		},
		submitGift: function() {		
			submitGift();
		},
		submitDonorEdit: function() {
			submitDonorEdit();
		},
		submitGiftEdit: function() {
			submitGiftEdit();
		},
		submitNewTitle: function(title,callback) {
			submitNewTitle(title,callback);
		},
		getDonorDataArray: function(callback) {
			getDonorDataArray(callback);
		},
		getActiveDonorData: function(callback) {
			getActiveDonorData(callback);
		},
		getGiftData: function(callback) {		
			getGiftData(callback);
		},
		getTitleArray: function(callback,index) {
			getTitleArray(callback,index);
		},
		getActiveNameString: function(callback) {
			getActiveNameString(callback);
		},
		getCurrentDate: function() {
			return getCurrentDate();
		},
		getGiftDatesForActiveDonor: function(callback) {
			getGiftDatesForActiveDonor(callback);
		},
		setActiveGift: function(giftID, callback) {
			setActiveGift(giftID,callback);
		}
	};

}(jQuery));

