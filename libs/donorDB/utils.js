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
		MESSAGE_DELAY = 4000,

		submitSearch,
		submitNewDonorInfo,
		submitGift,
		submitDonorEdit,
		submitGiftEdit,
		submitNewTitle,
		showNewDonationList,
		getDonorDataArray,
		getActiveDonorData,
		getGiftData,
		getActiveNameString,
		getCurrentDate,
		getTitleArray,
		getGiftDatesForActiveDonor,
		getNewDonationList,
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

	showNewDonationList = function() {

		if(authentication.getUserRole() == 2)  {

			/* Check and see if the current page is 'lookup-view' */
			var page = viewUtils.getPage();
			alert("page: " + page);

			//getNewDonationList(searchView.createNewDonationList);
		}		
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

	submitNewDonorInfo = function(anonymous) {
			
		var submitData = $("#donor-input-form").serialize();

		if(anonymous == 1)
			submitData += "&anonymousFlag=1&letterFlag=0";

		requestObj = {

			type: "POST", 
			url: _editUrl + '/inputDonorInfo',
			data: submitData,
			dataType: "text",
			cache: true,
			success: function(response) {
				addNewDonorView.setMessage(response);
				setTimeout( function(){ 
					addNewDonorView.toggleSubmitMessage(); 
					addNewDonorView.resetForm();
				}, MESSAGE_DELAY );
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
				addGiftView.setMessage(response);
				setTimeout( function(){ addGiftView.toggleSubmitMessage(); }, MESSAGE_DELAY );
				addGiftView.resetForm();
			},
			error: function ( textStatus, errorThrown ) {
                alert( errorThrown );
            }
		};
		
		doAjax(requestObj);
	};

	submitGiftEdit = function() {

		requestObj = {

			type: "POST", 
			url: _editUrl + '/inputGiftEdit',
			data: $("#add-gift-form").serialize(),
			dataType: "text",
			cache: true,
			success: function(response) {
				editGiftView.setMessage(response);
				setTimeout( function(){ editGiftView.toggleSubmitMessage(); }, MESSAGE_DELAY );
			},
			error: function ( textStatus, errorThrown ) {
                alert( errorThrown );
            }
		};
		
		doAjax(requestObj);
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
				setTimeout( function(){ editDonorView.toggleSubmitMessage(); }, MESSAGE_DELAY );
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

	getNewDonationList = function(callback) {

		requestObj = {

			type: "POST", 
			url: _searchUrl + '/queryDatabaseNewDonations',
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
		submitNewDonorInfo: function(anonymous) {		
			submitNewDonorInfo(anonymous);
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
		showNewDonationList: function() {
			showNewDonationList();
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
		getNewDonationList: function(callback) {
			getNewDonationList(callback);
		},
		setActiveGift: function(giftID, callback) {
			setActiveGift(giftID,callback);
		}
	};

}(jQuery));

