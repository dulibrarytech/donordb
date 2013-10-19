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
		getTypedLetterRequests,
		getActiveGift,
		getStatistics,
		setActiveGift,
		setLetterComplete,
		loadPreviousSearchResults;

	doAjax = function(ajaxObj) {

		$(document).ajaxStart(function() {
            $.fancybox.showLoading();
        });

        $(document).ajaxStop(function() {
            $.fancybox.hideLoading();
        });

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
                alert( "getDonorDataArray: " + errorThrown );
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
			//async: false
			success: function (response) {
				callback(response);
			},
			error: function ( textStatus, errorThrown ) {
                alert( "getActiveDonorData: " + errorThrown );
            }
		};

		doAjax(requestObj);
	};

	getActiveGift = function(callback) {

		requestObj = {

			type: "POST", 
			url: _searchUrl + '/getActiveGiftID',
			dataType: "json",
			cache: true,
			success: function (response) {
				callback(response);
			},
			error: function ( textStatus, errorThrown ) {
                alert( "getActiveGift: " + errorThrown );
            }
		};

		doAjax(requestObj);
	};

	// For menu onclick event.  Currently not in use.  This should be located in a view, anyways
	showNewDonationList = function() {

		if(authentication.getUserRole() == 2)  {

			// Show list or table
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
                alert( "submitSearch: " + errorThrown );
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
                alert( "submitNewDonorInfo: " + errorThrown );
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
                alert( "submitNewTitle: " + errorThrown );
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
                alert( "submitGift: " + errorThrown );
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
                alert( "submitGiftEdit: " + errorThrown );
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
                alert( "submitDonorEdit: " + errorThrown );
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
                alert( "getGiftData: " + errorThrown );
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
                alert( "getActiveNameString: " + errorThrown );
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
                alert( "getTitleArray: " + errorThrown );
            }
		};

		doAjax(requestObj);
	};

	getGiftDatesForActiveDonor = function(callback) {

		requestObj = {

			type: "POST", 
			url: _searchUrl + '/queryDatabaseDonorGifts',
			dataType: "json",
			async: false,
			cache: true,
			success: function(response) {

				callback(response);
			},
			error: function ( textStatus, errorThrown ) {
                alert( "getGiftDatesForActiveDonor: " + errorThrown );
            }
		};

		//alert("1 returning response");

		doAjax(requestObj);
	};

	getNewDonationList = function(callback) {

		requestObj = {

			type: "POST", 
			url: _searchUrl + '/queryDatabaseNewDonations',
			dataType: "json",
			cache: true,
			success: function(response) {
				//Set up data array for 'createalertlist'  pass data array into callback
				callback(response);
			},
			error: function ( textStatus, errorThrown ) {
                alert( "getNewDonationList: " + errorThrown );
            }
		};

		doAjax(requestObj);
	};

	getTypedLetterRequests = function(callback) {

		requestObj = {

			type: "POST", 
			url: _searchUrl + '/queryDatabaseTypedLetterRequests',
			dataType: "json",
			cache: true,
			success: function(response) {
				//Set up data array for 'createalertlist'  pass data array into callback
				callback(response);
			},
			error: function ( textStatus, errorThrown ) {
                alert( "getTypedLetterRequests: " + errorThrown );
            }
		};

		doAjax(requestObj);
	};

	getStatistics = function(callback,type) {

		var searchForm = "#search-form";

		requestObj = {

			type: "POST", 
			url: _searchUrl + '/statisticsSearch',
			data: $(searchForm).serialize() + "&searchType=" + type,
			dataType: "json",
			cache: true,
			success: function(response) {
				callback(response);
			},
			error: function ( textStatus, errorThrown ) {
                alert( "getStatistics: " + errorThrown );
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
                alert( "setActiveGift: " + errorThrown );
            }
		};
		
		doAjax(requestObj);
	};

	setLetterComplete = function(giftID) {

		requestObj = {

			type: "POST", 
			url: _editUrl + '/sendLetter',
			data: "giftID=" + giftID,
			dataType: "text",
			cache: true,
			success: function(response) {
				
				// Refresh the inbox
				viewUtils.getList();
			},
			error: function ( textStatus, errorThrown ) {
                alert( "setLetterComplete: " + errorThrown );
            }
		};
		
		doAjax(requestObj);
	};

	loadPreviousSearchResults = function(view) {

		if(typeof view == "undefined" || view == null) {

			view = "search";
		}

		var page, requestUrl;
		if(view === "search") {

			page = _searchUrl;
			requestUrl = _searchUrl + '/recordSearch';
		}
		else if(view === "statistics") {

			page = _statsUrl;
			requestUrl = _statsSearchUrl;
		}

		// Request the previous search results from the server session cache
		requestObj = {

			type: "POST", 
			url: requestUrl,
			data: "&searchType=reload",
			dataType: "json",
			cache: true,
			success: function(response) {

				// Cache the search results
				if(typeof response == "object") {

					sessionStorage.setItem('search_results', JSON.stringify(response));
					//var test = JSON.parse(sessionStorage.getItem('search_results'));
				}

				// Load specified view
				window.location.href = page;
			},
			error: function ( textStatus, errorThrown ) {
                alert( "loadPreviousSearchResults: " + errorThrown );
            }
		};
		
		doAjax(requestObj);
	};

	return {

		doAjax: function(reqObj) {
			doAjax(reqObj);
		},
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
		getTypedLetterRequests: function(callback) {
			getTypedLetterRequests(callback);
		},
		getActiveGift: function(callback) {
			getActiveGift(callback);
		},
		getStatistics: function(callback,type) {
			getStatistics(callback,type);
		},
		setActiveGift: function(giftID, callback) {
			setActiveGift(giftID,callback);
		},
		setLetterComplete: function(giftID) {
			setLetterComplete(giftID);
		},
		loadPreviousSearchResults: function(view) {
			loadPreviousSearchResults(view);
		}
	};

}(jQuery));

