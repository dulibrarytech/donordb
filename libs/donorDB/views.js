/*
 * Donor Application
 *
 * Page layout scripts 
 *
 * Author: Jeff Rynhart
 * 
 * University of Denver, June 2013
 */

/*
 * The home page.  Will display user-specific elements
 */
searchView = (function($) {

	var isIE = $.browser.msie ? true : false,
		MAX_TD_CHARS = 35;

	var initPage,
		initSession,
		addEvents,
		setRole,
		setQueue,
		setAnonymousCheckState,
		setSearchState,
		getQueue,
		resetSearch,
		createAlertList,
		createDonorTable,
		createGiftTable,
		reloadSearchResults,
		toggleResultsView;

	initPage = function() {

		// Ensure the full url string is displayed in the location bar
		if(document.URL.substring(0,4) == "https") {
                        history.pushState(null, null, _searchUrl);
                }

		$(".content-window").css("height", "435px");
		$(".pre-scrollable").css("max-height", "415px");
		$("#table-section").css("height", "405px");

		$("#page-label").text("Search Records");

		$("#fname_input_box").hide();
		$("#fname_label").hide();
		$("#search_return").hide();
		$("#table-section").hide();
		$("#post-search-buttons").hide();
		$("#alert-section-label").hide();
		$("#data-section-1").hide();

		$("#anonymous-gift-check").prop('checked',false); // Bug 207: Hard remove of check with each page load...

		if(isIE) {
			
			//$("#anon_check_label").css("margin-right", "40px");
			// $("#anonymous-gift-check").css("margin-right", "25px");
			// $("#details_search_label").css("margin-right", "40px");
			// $("#details-search-check").css("margin-left", "15px");
		}

		addEvents();
		form.addDonorDBSearchFormValidation();
	};

	initSession = function() {

		if(authentication.validateLocalSession())
		{
			var queue = getQueue();

			// Set user-specific layout
			setRole(viewUtils.getProfile().roleID);

			// If the queue is empty, set it here.  List is created in getList()
			if(queue == "Queue Empty.") {

				viewUtils.getList();
			}
			else {

				createAlertList(queue);
			}	

			// Set user namestring
			viewUtils.setUserLabel();

			// If there are search results cached, display them in the results view now.
			// This cache array is set externally (in utils).  It should always be null until temporarily set by utils.
			var searchResults = JSON.parse(sessionStorage.getItem('search_results'));
			if(searchResults != null) {

				reloadSearchResults(searchResults);
				sessionStorage.setItem('search_results', null); // Set to null after each reload
			}

		}
		else {
			alert("Local session not validated.  Please contact systems support if there is a problem logging in.");
			authentication.logout();
		}
			
	};

	addEvents = function() {

		$("#search-form").validate({

	        // Handler
	        errorClass: "invalid",
	        onkeyup: function(element) {$(element).valid()},
	        onfocusout: false,
	        submitHandler: function() {

	        	var fromDate	= $("#fromDate").val(),
	        		toDate 		= $("#toDate").val(),
	        		anonymous 	= $("#anonymous-gift-check").val(),
	        		keyword		= $("#lname_input_box").val(),
	        		details 	= $("#details-search-check").val(),
	        		state 		= anonymous + details,
	        		type 		= "donor";

	        	// Run search based on anonymous state and the presence of date terms
	        	// if(anonymous == '1') {

	        	// 	type = "anonymous";
	        	// 	utils.submitSearch(createGiftTable,type);
	        	// }
	        	// else {

	        	// 	//If a date field has been populated, search results should display gifts by date.  If not, display donor results
		        // 	if(fromDate != "" || toDate != "") {

		        // 		type = "gift";
		        // 		utils.submitSearch(createGiftTable,type);
		        // 	}
		        // 	else {

		        // 		type = "donor";
		        // 		utils.submitSearch(createDonorTable,type);
		        // 	}
	        	// }

	        	switch(state) {

					case '01':

						type = "giftDetails";
						utils.submitSearch(createGiftTable,type);

						break;

					case '10':

	        		 	type = "anonymous";
	        		 	utils.submitSearch(createGiftTable,type);

						break;

					case '11':

						type = "anonymousDetails";
						utils.submitSearch(createGiftTable,type);

						break;

					default:

						//If a date field has been populated, search results should display gifts by date.  If not, display donor results
			        	if(fromDate != "" || toDate != "") {

			        		type = "gift";
			        		utils.submitSearch(createGiftTable,type);
			        	}
			        	else {

			        		type = "donor";
			        		utils.submitSearch(createDonorTable,type);
			        	}

						break;
				}

	        	// Store the search terms for search reload purposes
	        	var prevSearchTerms = {keyword:keyword, toDate:toDate, fromDate:fromDate, anonymous:anonymous, type:type};
	        	sessionStorage.setItem('prev_search_terms', JSON.stringify(prevSearchTerms));
	        },
	        errorPlacement: function(error, element) {

				//error.appendTo('#errordiv');
				alert(error.html());
			}
	    });

	    $("#anonymous-gift-check").click(function() { 

	    	if($("#anonymous-gift-check").val() == '0') {

	    		setAnonymousCheckState('1'); // Placed in another function for 'return to search' use
	    	}
	    	else {

	    		setAnonymousCheckState('0');
	    	}
	    });

	    $("#details-search-check").click(function() { 

	    	if($("#details-search-check").val() == '0') {

	    		$("#details-search-check").val('1');
    			$("#details-search-check").prop('checked',true);
	    	}
	    	else {

	    		$("#details-search-check").val('0');
    			$("#details-search-check").prop('checked',false);
	    	}

	    	setSearchState();
	    });

	    $("#search_return").click(function() { 

	    	var lname = $("#lname_input_box").val(),
	    		todate = $("#toDate").val(),
	    		fromdate = $("#fromDate").val();

	    	// // Check for blank form.  If blank, repopulate from previous search terms
	    	if(lname == "" && todate == "" && fromdate == "") {

	    		var prevSearch =  JSON.parse(sessionStorage.getItem('prev_search_terms'));

	    		if(typeof prevSearch.anonymous === 'undefined' || prevSearch.anonymous == null)
	    			setAnonymousCheckState('0');
	    		else
	    			setAnonymousCheckState(prevSearch.anonymous);

	    		$("#lname_input_box").val(prevSearch.keyword);
	    		$("#toDate").val(prevSearch.toDate);
	    		$("#fromDate").val(prevSearch.fromDate);
	    	}

	    	toggleResultsView(true);
	    });

	    $("#search_new").click(function() { 

	    	resetSearch();
	    });
	};

	setAnonymousCheckState = function(val) {

		if(val == '1') {

    		$("#anonymous-gift-check").val('1');
    		$("#anonymous-gift-check").prop('checked',true);
    	}
    	else {

    		$("#anonymous-gift-check").val('0');
    		$("#anonymous-gift-check").prop('checked',false);
    	}

    	setSearchState();
	};
	
	setSearchState = function() {

		var state = $("#anonymous-gift-check").val() + $("#details-search-check").val();

		switch(state) {

			case '01':

				$("#lname_label").text('Search gift details:');
    			$("#lname_input_box").prop('placeholder', '');

				break;

			case '10':

				$("#lname_label").text('Search anonymous gift descriptions:');
    			$("#lname_input_box").prop('placeholder', 'Leave blank to show all donations');

				break;

			case '11':

				$("#lname_label").text('Search anonymous gift details:');
    			$("#lname_input_box").prop('placeholder', '');

				break;

			default:

				$("#lname_label").text('Last Name or Organization:');
    			$("#lname_input_box").prop('placeholder', 'Leave blank to search all donors');

				break;
		}	
	};

	// Set layout for user status.
	setRole = function(roleID) {

		switch(roleID) {

			case 1: 	// Acquisitions
				
				
				// TODO: Display any kind of message or task list in the table section.  Or 'DONOWT'

				// set app title text: |5?

				break;

			case 2: 	// Admin

				$(".content-window").css("height", "700px");
				$("#table-content").css("height", "125px");
				$("#table-section").show();
				$("#alert-section-label").text("Inbox");
				$("#alert-section-label").show();
				// set app title text? donor db app?
				
				break;

			case 3: 	// External Relations

				$(".content-window").css("height", "700px");
				$("#table-content").css("height", "125px");
				$("#table-section").show();
				$("#alert-section-label").text("Inbox");
				$("#alert-section-label").show();
				// set app title text? donor db app
				
				break;

			default:
				
				break;
		}
	};

	/*
	 * Set the local queue, and refresh the list
	 * @param array : List of data to place in the queue
	 */
	setQueue = function(queueData) {

		if(authentication.validateLocalSession()) {

			//sessionStorage.setItem('session_queue', null);
			sessionStorage.setItem('session_queue', JSON.stringify(queueData));
			createAlertList(queueData);
		}
	};

	/*
	 * @return array : All data from the local session queue
	 */
	getQueue = function() {

		if(authentication.validateLocalSession()) {

			var queueData = JSON.parse(sessionStorage.getItem('session_queue'));
			if(typeof queueData == 'undefined' || queueData == null)
				queueData = "Queue Empty.";

			return queueData;
		}
	};

	resetSearch = function() {

		window.location.href = _searchUrl;
	};

	/*
	 * Builds list items from input data and inserts them into the alert list section
	 *
	 * @param array tableData Donor and d ..
	 */
	createAlertList = function(tableData) {

		var results = '<table class="table table-bordered table-nostripes">'; 

		if(typeof tableData == "object") {

			$.each(tableData, function (key, value) {
				
				results += '<tr>';
				results += '<td class="span1" style="text-align: center"> <a href="' + _editUrl + '/editGiftView/' + value.donorID + '/' + value.giftID +'">Edit</a> </td>';

				results += '<td class="span2">' + value.giftDate + '</td>';

				if(value.lastName == "" || value.lastName == null) {

					// ie: truncate td string manually.
					if(isIE && value.org.length > MAX_TD_CHARS) {

						var trunc = value.org.substring(0,MAX_TD_CHARS-1);
						trunc += "...";
						results += '<td class="span4 name-cell4">' + trunc + '</td>';
					}
					else
						results += '<td class="span4 name-cell4">' + value.org + '</td>';
				}
				else
					results += '<td class="span4 name-cell4">' + value.lastName + '</td>';

				results += '<td class="span4 name-cell4">' + value.firstName + '</td>';

				results += '<td style="text-align: center"> <a onclick="' + tableData[0]['action'] + '(' + value.giftID + ');">' + tableData[0]['actionText'] + '</a> </td>';
				results += '</tr>';
			} );
		}	
		else if(typeof tableData == "string") {

			// Display message only
			results = '<tr><td class="span12" style="text-align: center; ">' + tableData + '</td></tr>';
		}

		results += '</table>';

		//toggleResultsView(false);
		$("#table-header").html("<thead> <th class='span1'><!--SPACE--></th> <th class='span2'>Gift Date</th> <th class='span4'>Last Name / Organization</th> <th class='span4'>First Name</th> <th><!--SPACE--></th> </thead>");
		$("#table-content").html(results);
	};

	createDonorTable = function(tableData) {

		var results = '<table class="table table-bordered table-striped">'; 

		if(typeof tableData == "object") {

			$.each(tableData, function (key, value) {

				results += '<tr>';
				results += '<td class="span2" style="text-align: center"> <a href="' + _editUrl + '/editDonorView/' + value.donorID + '">Edit</a> </td>';

				if(value.lastName == "" || value.lastName == null) {

					// ie: truncate td string manually.
					if(isIE && value.org.length > MAX_TD_CHARS) {

						var trunc = value.org.substring(0,MAX_TD_CHARS-1);
						trunc += "...";
						results += '<td class="span4 name-cell4">' + trunc + '</td>';
					}
					else
						results += '<td class="span4 name-cell4">' + value.org + '</td>';
				}
				else
					results += '<td class="span4 name-cell4">' + value.lastName + '</td>';
				
				results += '<td class="span4 name-cell4">' + value.firstName + '</td>';

				results += '<td style="text-align: center"> <a href="' + _editUrl + '/addGiftView/' + value.donorID + '">Add Gift</a> </td>';
				results += '</tr>';

			} );
		}	
		else if(typeof tableData == "string") {

			// Display message only
			results = '<tr><td class="span12" style="text-align: center; font-weight: bold;">' + tableData + '</td></tr>';
		}	

		results += '</table>';

		toggleResultsView(true);
		$("#table-header").html("<thead> <th class='span2'><!--SPACE--></th> <th class='span4'>Last Name / Organization</th> <th class='span4'>First Name</th> <th><!--SPACE--></th> </thead>");
		$("#table-content").html(results);
	};

	createGiftTable = function(tableData) {

		var results = '<table class="table table-bordered table-striped">';

		if(typeof tableData == "object") {

			// Remove the 'Add Gift' link if the result is an anonymous donation.
			var addLinkText;

			$.each(tableData, function (key, value) {

				if(value.lastName == "Anonymous Donor") {
					addLinkText = "";
					value.letterStatus = "";
				}
				else {
					addLinkText = "Add Gift";
				}

				results += '<tr>';
				results += '<td class="span1" style="text-align: center"> <a href="' + _editUrl + '/editGiftView/' + value.donorID + '/' + value.giftsID +'">Edit</a> </td>';

				results += '<td class="span2">' + value.giftDate + '</td>';

				if(value.lastName == "" || value.lastName == null)  {

					// ie: truncate td string manually.
					if(isIE && value.org.length > MAX_TD_CHARS) {

						var trunc = value.org.substring(0,MAX_TD_CHARS-1);
						trunc += "...";
						results += '<td class="span3 name-cell3">' + trunc + '</td>';
					}
					else
						results += '<td class="span3 name-cell3">' + value.org + '</td>';
				}
				else
					results += '<td class="span3 name-cell3">' + value.lastName + '</td>';

				results += '<td class="span3 name-cell3">' + value.firstName + '</td>';

				results += '<td class="span2">' + value.letterStatus + '</td>';

				if(value.lastName != "Anonymous Donor") {
					results += '<td style="text-align: center"> <a href="' + _editUrl + '/addGiftView/' + value.donorID + '">' + addLinkText + '</a> </td>';
				}
				else {
					results += '<td></td>';
				}
				
				results += '</tr>';

			} );
		}	
		else if(typeof tableData == "string") {

			// Display message only
			results = '<tr><td class="span12" style="text-align: center; font-weight: bold;">' + tableData + '</td></tr>';
		}	

		results += '</table>';

		toggleResultsView(true);
		$("#table-header").html("<thead> <th class='span1'><!--SPACE--></th> <th class='span2'>Gift Date</th> <th class='span3'>Last Name / Organization</th> <th class='span3'>First Name</th> <th class='span2'>Letter</th> <th><!--SPACE--></th> </thead>");
		$("#table-content").html(results);
	};

	/*
	 * Toggle view between the search form and search results table elements.
	 *
	 * @param boolean showButtons TRUE to toggle visibility of the 'search return' buttons
	 */
	toggleResultsView = function(showButtons) {

		if(showButtons)
			$("#post-search-buttons").toggle();

		// Resize the content window for the acquisitions user.  At this point, there is no alert section 
		// and the window size changes between search and results views.
		var profile = viewUtils.getProfile();
		if(profile.roleID == 1) {

			$("#table-section").toggle();

			if($("#search-form").is(":visible")) {
				$("#home-window").css('height', '720px');
			}
			else {
				$("#home-window").css('height', '435px');
			}
		}

		// For the admin and external relation users, there is an alert section on the home view.  
		// This needs to be refreshed upon returning to the home view from the results view.
		// Also, the constraint of 125px used on the alert section needs to be removed when switching to search results.
		else if(profile.roleID == 2 || profile.roleID == 3) {

			$("#alert-section-label").toggle(); 

			if($("#alert-section-label").is(":visible")) {

				$("#table-content").css("height", "125px");
				createAlertList(getQueue());
			}
			else {

				// Remove constraint to display search results
				$("#table-content").css("height", "405px");
			}
		}

		else {

			window.location.href =  _searchUrl;
		}

		$("#search-form").toggle();
		$("#search_return").toggle();
	};

	reloadSearchResults = function(tableData) {

		// Make sure tableData object is valid and of the proper format for the table
		if(typeof tableData == "object" && tableData["0"] != null) {

			// Detect search type based on giftsID state
			if(typeof tableData['0'].giftsID == 'undefined' || tableData['0'].giftsID == null) {

				createDonorTable(tableData);
			}
			else {

				createGiftTable(tableData);
			}
		}
		else if(typeof tableData == "string") {

			createDonorTable("Reload error: " + tableData);
		}
		else {

			createDonorTable("Reload error: Null tableData object");
		}	
	};

	return {

		initPage: function() {	
			initPage();
		},
		initSession: function() {
			initSession();
		},
		setQueue: function(queueData) {
			setQueue(queueData);
		},
		createDonorTable : function(tableData) {
			createResultsTable(tableData);
		},
		createGiftTable : function(tableData) {
			createGiftTable(tableData);
		},
		reloadSearchResults: function(tableData) {
			reloadSearchResults(tableData);
		},
		createAlertList : function(tableData) {
			createAlertList(tableData);
		}
	};

}(jQuery)); // searchView()


browseDonorsView = (function($) {

	var isIE = $.browser.msie ? true : false,
		MAX_TD_CHARS = 35;

	var initPage,
		createJumpToLinks,
		onClickJumpToLetter,
		setQueue,
		getQueue,
		createDonorTable;

	initPage = function() {

		$(".content-window").css("height", "770px");
		$(".pre-scrollable").css("max-height", "485px");

		$("#page-label").text("Donor Listing");

		$("#table-header").html("<thead> <th class='span2'><!--SPACE--></th> <th class='span4'>Last Name / Organization</th> <th class='span4'>First Name</th> <th style='align:right'><!--SPACE--></th> </thead>");
		//$("#table-header").html("<thead> <th style='width: 140'><!--SPACE--></th> <th style='width: 284'>Last Name / Organization</th> <th style='width: 284'>First Name</th> <th style='width: 140; float: right;'><!--SPACE--></th> </thead>");

		utils.getDonorDataArray(setQueue); 
		viewUtils.setUserLabel();
	};

	onClickJumpToLetter = function(letter) {
		
		// For the scrolltop animation.  Not in use.
		// $('#scroll-section').animate({
  //       	scrollTop: $("#" + letter).offset().top
  //   	}, 	10);
	
		createDonorTable(getQueue(letter));
	};

	createJumpToLinks = function(jumpToLetters) {

		var links = ""; 

		// For the scrolltop animation.  Not in use.
		// for(var key in jumpToLetters) {

		// 	links += "<a onclick='browseDonorsView.onClickJumpToLetter(\"" + key + "\")'>" + key + "</a>&nbsp&nbsp";
		// }

		$.each(jumpToLetters, function (key, value) { 

			links += "<a onclick='browseDonorsView.onClickJumpToLetter(\"" + value + "\")'>" + value + "</a>&nbsp&nbsp";
		});

		$("#jumpTo").html(links);
	};

	setQueue = function(queueData) {

		if(authentication.validateLocalSession()) {

			//sessionStorage.setItem('session_queue', null);
			sessionStorage.setItem('donorData_queue', JSON.stringify(queueData));
			createDonorTable(queueData);
		}
	};

	getQueue = function(chr) {

		if(authentication.validateLocalSession()) {

			var queueData = JSON.parse(sessionStorage.getItem('donorData_queue'));

			if(typeof queueData == 'undefined' || queueData == null) {
				
				queueData = "Queue Empty.";
			}
			else {

				// Return donors with last name beginning with chr.  If chr is 'ALL', return all of the donor data in the queue
				if(typeof chr != 'undefined' && chr != null && chr != '(Display All)') {

					var tempArray = new Array();
						index = 0;

					$.each(queueData, function (key, value) {

						if(value.lastName == null || value.lastName == "") {

								if(value.org.charAt(0) == chr) {

								tempArray[index] = value;

								index++;
							}
						}
						else if(value.lastName.charAt(0) == chr) {

							tempArray[index] = value;

							index++;
						}
					});

					// Add a message string to show no donors were found under the specified char
					if(tempArray.length == 0) {

						queueData = null;
						queueData = "No donors found under " + chr;
					}
					else
						queueData = tempArray;
				}
			}

			return queueData;
		}
	};

	createDonorTable = function(tableData) {

		$("#table-content").html('');

		var results = '<table class="table table-bordered table-striped">';
			temp = "";

		// For the scrolltop animation.  Not in use.
		// var	jumpToLetters = { A: false, B: false, C: false, D: false, E: false, F: false, G: false, H: false, I: false, J: false, K: false, L: false, M: false, 
		// 							N: false, O: false, P: false, Q: false, R: false, S: false, T: false, U: false, V: false, W: false, X: false, Y: false, Z: false };
		//var	jumpToChar = '';
		var jumpToLetters = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '(Display All)');

		createJumpToLinks(jumpToLetters);

		if(typeof tableData == "object") {

			$.each(tableData, function (key, value) {


				results += '<tr>';
				results += '<td class="span2" style="text-align: center">';

			// For the scrolltop animation.  Not in use.
			/*
			 * Add the jump-to divs for each letter of the alphabet.  Once one is added, mark it as 'used' so it
			 * is only placed in the list once.
			 * Divs need to be placed within <td> elements to work correctly with the table laypot.
			 */  
			//  if(value.lastName != null) {

			// 	jumpToChar = value.lastName.charAt(0).toUpperCase();
			// 	if(jumpToLetters[jumpToChar] == false) {
 
			// 		results += '<div id="' + jumpToChar + '">';
			// 		jumpToLetters[jumpToChar] = true;
			// 	}
			// } 

				results += '<a href="' + _editUrl + '/editDonorView/' + value.donorID + '">Edit</a> </td>';

				if(value.lastName == "" || value.lastName == null) {

					// ie: truncate td string manually.
					if(isIE && value.org.length > MAX_TD_CHARS) {

						var trunc = value.org.substring(0,MAX_TD_CHARS-1);
						trunc += "...";
						results += '<td class="span4 name-cell4">' + trunc + '</td>';
					}
					else
						results += '<td class="span4 name-cell4">' + value.org + '</td>';
				}	
				else 
					results += '<td class="span4 name-cell4">' + value.lastName + '</td>';	

				results += '<td class="span4 name-cell4">' + value.firstName + '</td>';

				results += '<td style="text-align: center"> <a href="' + _editUrl + '/addGiftView/' + value.donorID + '">Add Gift</a> </td>';
				results += '</tr>';
			});
		}
		else if(typeof tableData == "string") {

			// Display message only
			results = '<tr><td class="span12" style="text-align: center; font-weight: bold;">' + tableData + '</td></tr>';
		} 

		results += '</table>';

		$("#table-content").html(results);
	};

	return {

		initPage: function() {
			initPage();
		},
		setQueue: function(queueData) {
			setQueue(queueData);
		},
		createDonorTable: function(tableData) {
			createDonorTable(tableData);
		},
		onClickJumpToLetter: function(letter) {
			onClickJumpToLetter(letter);
		}
	};

}(jQuery)); // browseDonorsView()


editGiftView = (function($) {

	var isIE = $.browser.msie ? true : false,
		MAX_TD_CHARS = 35;

	var initPage,
		addEvents,
		setRole,
		blockForm,
		setMessage,
		unblockForm,
		setNameString,
		setGiftFormData,
		toggleSubmitMessage,
		createGiftDateDropDown;

	initPage = function(anonymous) {

		$("#page-label").text("View / Edit Gift");

		$('#gift_submit_button').html("Update");

		//$("#status-change-controls").hide();
		$('#add_info_message').hide();
		$("#gift-date-box").hide();
		$("#add_anon_info_button").hide();
		//$("#letter-status").hide();

		if(anonymous) {
			$(".content-window").css("height", "690px");
			$("#important_gift_check").hide();
			$("#letter-status").hide();
			//$("#gift-date-box").prop('disabled', 'true');
		}
		else {
			$(".content-window").css("height", "730px");
			utils.getActiveDonorData(setDonorAddress);
		}

		// Set user-specific layout
		setRole(viewUtils.getProfile().roleID);

		addEvents();
		form.addDonorDBGiftFormValidation();

		utils.getGiftDatesForActiveDonor(createGiftDateDropDown);
		utils.getGiftData(setGiftFormData);

		viewUtils.setUserLabel();

		// ie: reposition the date dropdown
		if(isIE) {
			
			$("#select_date_elts").css('margin-right', '0px');
			$("#gift_date_label").css('margin-right', '80px');
			$("#change_date_elts").css('margin-right', '67px');
		}

		//$("#gift_details_box").prop('disabled', 'true');
	};

	addEvents = function() {

		$("#add-gift-form").validate({

	        errorClass: "invalid",
	        // onkeyup: function(element) {$(element).valid()},
	        onfocusout: false,
	        submitHandler: function() {

	        	if(confirm("Are you sure?")) {

	        		utils.submitGiftEdit();
	            	$('#add_info_message').html("Updating gift info...");
	            	toggleSubmitMessage();
	            }
	        },
	        errorPlacement: function(error, element) {

				//error.appendTo('#errordiv');
				alert(error.html());
			}
	    });

	    $("#dropdown-box-section").change( function() {

	  //   	var newDate = $("#dropdown-box").val();
			// $("#edit-date-box").val(newDate);
			var gdate = $("#dropdown-box>option:selected").text();
			$("#edit-date-box").val(gdate);

			var giftID = $("#dropdown-box>option:selected").val();
	    	utils.setActiveGift(giftID,setGiftFormData);
	    });

	    $("#back_button").click( function() {

	    	viewUtils.onClickBack();
	    });

	    $("#gen_letter_button").click( function() {

	    	utils.getActiveGift(viewUtils.displayLetter);
	    });

	    // If user is not acquisitions, add 'letter status change' functionality (Add click handler to show controls)
	    if(viewUtils.getProfile().roleID != 1) {

		    $("#letter-status").click( function() {

				//alert($("#status-change-controls").css('visibility'));
				if($("#status-change-controls").css('visibility') == "hidden") {

					$("#status-change-controls").css('visibility', 'visible');
				}
				else {

					$("#status-change-controls").css('visibility', 'hidden');
				}
		    });
	    }
	};

	// Set layout for user status.
	setRole = function(roleID) {

		switch(roleID) {

			case 1: 	// Acquisitions
				
				
				// TODO: Display any kind of message or task list in the table section.  Or 'DONOWT'

				// set app title text: |5?
				$("#gen_letter_button").hide();

				break;

			case 2: 	// Admin

				$("#skip_letter_check").hide();
				
				break;

			case 3: 	// External Relations

				$("#skip_letter_check").hide();
				$("#gen_letter_button").hide();
				
				break;

			default:
				
				break;
		}
	};

	// Blocks all fields and displays 'message' in the description section
	blockForm = function(message) {

		$("#gift_quantity_box").attr('value', "");
		$("#gift_quantity_box").attr('placeholder', "");

		$("#gift_description_box").text(message);

		$("#gift_quantity_box").prop('disabled', 'true');
		$("#gift_description_box").prop('disabled', 'true');
		$("#edit-date-box").prop('disabled', 'true');
		$("#important-checkbox").prop('disabled', 'true');

		$("#gift_submit_button").hide();
	};

	unblockForm = function() {

		$("#gift_description_box").text("");

		$("#gift_quantity_box").prop('enabled', 'true');
		$("#gift_description_box").prop('enabled', 'true');
		$("#edit-date-box").prop('enabled', 'true');
		$("#important-checkbox").prop('enabled', 'true');

		$("#gift_submit_button").show();
	};

	setNameString = function(name) {

		$("#donor-name-label").text(name);
	};

	setGiftFormData = function(giftData) {

		unblockForm();

		$("#gift_quantity_box").val(giftData['giftQuantity']);

		$("#gift_description_box").text(giftData['giftDescription']);
		$("#gift_details_box").text(giftData['giftDetails']);

		$("#letter-status").html("Letter Status: " + giftData['letterStatus']);

		if(giftData['letterStatus'] == "Sent") {

			//$('#skip_letter_check').hide();
			$("#status-change-sent").prop('checked', 'true');
		}
		else if(giftData['letterStatus'] == "Pending") {
			$("#status-change-pending").prop('checked', 'true');
		}

		if(giftData['bypassLetter'] == 1) {

			$('#skip-letter-checkbox').prop('checked', true);

			// Remove on-click handler if status is bypassed.  This status should not be reset by the admin user.
			$("#letter-status").unbind();
			$("#letter-status").css('cursor', 'default');
		}
		else 
			$('#skip-letter-checkbox').prop('checked', false);

		if(giftData['importantFlag'] == 1) 
			$('#important-checkbox').prop('checked', true);
		else 
			$('#important-checkbox').prop('checked', false);

		setNameString(giftData['nameString']);
	};

	toggleSubmitMessage = function() {

		$("#add_info_message").toggle();
	};

	setMessage = function(message) {

		$("#add_info_message").html(message);
	};

	createGiftDateDropDown = function(giftDates) {

		var dropdownHTML = '<select class="input" id="dropdown-box">';
			activeGift = giftDates['activeGiftID'];

		$.each(giftDates, function (key, value) {

			if(key == "activeGiftID") 
				return true;

			if(key == activeGift)
				dropdownHTML += "<option selected value='" + key + "'>" + value + "</option>";
			else
				dropdownHTML += "<option value='" + key + "'>" + value + "</option>";
		} );

		dropdownHTML += '</select>';

		$("#dropdown-box-section").html(dropdownHTML);

		var gdate = $("#dropdown-box>option:selected").text();
		$("#edit-date-box").val(gdate);
	};

	setDonorAddress = function(donorData) {

		var address1 	= (donorData['addr1'] == null || donorData['addr1'] == "") ? "" : donorData['addr1'] + ", ";
			address2	= (donorData['addr2'] == null || donorData['addr2'] == "") ? "" : donorData['addr2'] + ", "; 
			city 		= (donorData['city'] == null  || donorData['city'] == "") ? "" : donorData['city'] + ", ";
			state       = (donorData['state'] == null || donorData['state'] == "") ? "" : donorData['state'];
			zip 		= (donorData['zip'] == null || donorData['zip'] == "") ? "" : donorData['zip'];
			country 	= (donorData['country'] == null || donorData['country'] == "") ? "" : donorData['country'];
			email 		= (donorData['email'] == null || donorData['email'] == "") ? "" : donorData['email'];

		var addressString = address1 + address2 + " " + city + state + " " + zip + " " + country; 

		$("#donor-address-label").text(addressString);

		$("#donor-email-label").text(email);
	};

	return {

		initPage: function(anonymous) {	
			initPage(anonymous);
		},
		blockForm: function(message) {
			blockForm(message);
		},
		setNameString: function(name) {	
			setNameString(name);
		},
		setDonorAddress: function(donorData) {
			setDonorAddress(donorData);
		},
		setGiftFormData: function(giftData) {
			setGiftFormData(giftData);
		},
		toggleSubmitMessage: function() {
			toggleSubmitMessage();
		},
		setMessage: function(message) {
			setMessage(message);
		},
		createGiftDateDropDown: function(giftDates) {	
			createGiftDateDropDown(giftDateData);
		}
	};

}(jQuery)) // editGiftView()


addGiftView = (function($) {

	var isIE = $.browser.msie ? true : false,
		MAX_TD_CHARS = 35;

	var initPage,
		addEvents,
		setRole,
		setNameString,
		toggleSubmitMessage,
		setMessage,
		addEvents,
		resetForm;

	initPage = function(anonymous) {

		//$(".content-window").css("height", "690px");

		$("#page-label").text("Add a Gift");
		$('#gift-date-box').attr('value', dateUtils.getCurrentDate());

		$('#gift_submit_button').html("Add Gift");
		$('#add_info_message').html("Adding new gift info...");

		//$("#status-change-controls").hide();
		$('#add_info_message').hide();
		$("#change_date_elts").hide();
		$("#add_anon_info_button").hide();
		$("#gen_letter_button").hide();

		// Crap!  Duct tape!
		$("#gift_date_label").css('margin-right', '25px');

		$("#gift_date_label").text('Gift Date:');

		if(anonymous) {
			$(".content-window").css("height", "695px");
			$("#important_gift_check").hide();
			$("#skip_letter_check").hide();
			$("#letter-status").hide();
		}
		else {
			$(".content-window").css("height", "725px");
			utils.getActiveDonorData(setDonorAddress);
		}

		// Set user-specific layout
		setRole(viewUtils.getProfile().roleID);

		utils.getActiveNameString(setNameString);

		addEvents();
		form.addDonorDBGiftFormValidation();

		viewUtils.setUserLabel();

		// ie kludge to reposition the date dropdown
		if(isIE) {
			
			$("#select_date_elts").css('margin-right', '30px');
			//$("#gift_date_label").css('margin-right', '9px');
		}

		// TEMP disable details until implemented
		//$("#gift_details_box").prop('disabled', 'true');
	};

	setNameString = function(name) {

		$("#donor-name-label").text(name);

		if(name == "Anonymous Donor") {

			$("#important_gift_check").hide();
			// $("#add_anon_info_button").show();
		}
	};

	addEvents = function() {

		$("#add-gift-form").validate({

	        errorClass: "invalid",
	        // onkeyup: function(element) {$(element).valid()},
	        onfocusout: false,
	        submitHandler: function() {

	        	utils.submitGift();
	            $('#add_info_message').html("Adding new gift info...");
	            toggleSubmitMessage();
	        },
	        errorPlacement: function(error, element) {

				//error.appendTo('#errordiv');
				alert(error.html());
			}
	    });

	    $("#add_anon_info_button").click( function() {

	    	window.location.href = _editUrl + "/addDonorView/1";
	    });

	    $("#back_button").click( function() {

	    	viewUtils.onClickBack();
	    });
	};

	// Set layout for user status.
	setRole = function(roleID) {

		switch(roleID) {

			case 1: 	// Acquisitions
				
				
				// TODO: Display any kind of message or task list in the table section.  Or 'DONOWT'

				// set app title text: |5?

				break;

			case 2: 	// Admin

				$("#skip_letter_check").hide();
				
				break;

			case 3: 	// External Relations

				$("#skip_letter_check").hide();
				
				break;

			default:
				
				break;
		}
	};

	toggleSubmitMessage = function() {

		$("#add_info_message").toggle();
	};

	setMessage = function(message) {

		$("#add_info_message").html(message);
	};

	resetForm = function() {

		$("#gift_description_box").val("");
		$("#gift_quantity_box").val("");
		$("#gift_details_box").val("");

		$("#skip-letter-checkbox").prop('checked',false); 
		$("#important-checkbox").prop('checked',false); 
	};

	return {

		initPage: function(anonymous) {	
			initPage(anonymous);
		},
		setNameString: function(name) {	
			setNameString(name);
		},
		toggleSubmitMessage: function() {
			toggleSubmitMessage();
		},
		setMessage: function(message) {
			setMessage(message);
		},
		resetForm: function() {
			resetForm();
		}
	};

}(jQuery)); // addGiftView()


addNewDonorView = (function($) {

	var initPage,
		addEvents,
		setRole,
		toggleSubmitMessage,
		setMessage,
		createTitleDropdown,
		showAddTitleBox,
		removeAddTitleBox,
		enterNewTitle,
		getTitleDropdownEntries,
		resetForm;

		anonymousView = 0;

	initPage = function(anonymous) {

		anonymousView = anonymous;

		//$(".content-window").css("height", "760px");

		// Not in use
		if(anonymous == 1) {

			$("#page-label").text("Add Anonymous Donor Info");
			$("#lower_well").hide();
			$(".content-window").css("height", "555px");
			$("#important_gift_check").hide();
		}		
		else {

			$("#page-label").text("Add New Donor Info");
			$(".content-window").css("height", "780px");
		}
			
		$("#add_info_message").hide();
		$("#title-edit-box").hide();
		$("#edit-gift-button").hide();

		$('#gift-date-box').attr('value', dateUtils.getCurrentDate());
		$("#description_area").prop('enabled', 'true');
		$("#gift_quantity_box").prop('enabled', 'true');

		$("#add_info_button").html("Save");

		$("#gen_letter_button").hide();
		$("#return_button").hide();

		$("#gift_date_label").text('Gift Date:');

		// Set user-specific layout
		setRole(viewUtils.getProfile().roleID);

		addEvents(anonymous);

		utils.getTitleArray(createTitleDropdown);
		form.addDonorDBEditFormValidation();

		viewUtils.setUserLabel();
	};

	addEvents = function(anonymous) {

		$("#donor-input-form").validate({

	        errorClass: "invalid",
	        onkeyup: function(element) {},
	        onfocusout: false,
	        submitHandler: function() {

	            utils.submitNewDonorInfo(anonymous);
	            $('#add_info_message').html("Adding new donor info...");
	            toggleSubmitMessage();
	        },
	        errorPlacement: function(error, element) {

				//error.appendTo('#errordiv');
				alert(error.html());
			}
	    });

	    $("#dropdown-box").change( function() {

	    	var titleVal = $("#title-dropdown").val();
	    	if(titleVal == "add_title")
	    		showAddTitleBox();
	    });

	    // Disable the enter keypress from submitting the form
	    $('#donor-input-form').on('keypress',function(e){

		    var p = e.which;
		    if(p==13){
		        // alert(document.activeElement.toString());
		        e.preventDefault();
		        return false;
		    }
		});

		$("#back_button").click( function() {

	    	viewUtils.onClickBack();
	    });
	};

	// Set layout for user status.
	setRole = function(roleID) {

		switch(roleID) {

			case 1: 	// Acquisitions
				
				
				// TODO: Display any kind of message or task list in the table section.  Or 'DONOWT'

				// set app title text: |5?

				break;

			case 2: 	// Admin

				$("#skip-letter-check-box").hide();
				
				break;

			case 3: 	// External Relations

				$("#skip-letter-check-box").hide();
				
				break;

			default:
				
				break;
		}
	};

	toggleSubmitMessage = function() {

		$("#add_info_message").toggle();
	};

	setMessage = function(message) {

		$("#add_info_message").html(message);
	};

	createTitleDropdown = function(titleData,index) {

		var dropdown;

		if(typeof(index) == "undefined")
			index = 0;

		dropdown = "<select class='input-medium' id='title-dropdown' name='title'><option value='no_title'></option>";
		dropdown += "<option value='add_title'>[Add New Title]</option>";

		$.each(titleData, function (key, value) {
			
			if(key == index)
				dropdown += "<option selected value='" + key + "'>" + value + "</option>";
			else 
				dropdown += "<option value='" + key + "'>" + value + "</option>";
		} );

		dropdown += "</select>";

		$("#dropdown-box").html(dropdown);
	};

	// Remove dropdown and add box to enter a new title.  Add handlers to submit new title data
	showAddTitleBox = function() {

		$("#dropdown-box").hide();
		$("#title-edit-box").val("");
		$("#title-edit-box").show();

		// Enter key event
		$('#title-edit-box').on('keypress',function(e){
		    var p = e.which;
		    if(p==13){

		        enterNewTitle();
		        return false;
		    }
		});

		// Submit data in the input box once the focus leaves the box
		$('#title-edit-box').on('focusout',function(){

		    enterNewTitle();
		});

		$("#title-edit-box").focus();
	};

	// Remove edit box and repopulate the dropdown, selecting the newly added title
	removeAddTitleBox = function() {

		$("#dropdown-box").show();
		$("#title-edit-box").hide();

		// Remove the handlers
		$('#title-edit-box').off('keypress');
		$('#title-edit-box').off('focusout');

		$("#title-edit-box").blur();
	};

	enterNewTitle = function() {

		boxText = $("#title-edit-box").val();

		if(boxText != "" && boxText != null) {

			utils.submitNewTitle(boxText,insertTitleToDropdownList);
		}
		else 
			$("#title-dropdown>option:eq(0)").attr('selected', 'true');	// select top index
			

		removeAddTitleBox();
	};

	// Returns an object with all of the ID:title pairs that are currently in the dropdown box
	insertTitleToDropdownList = function(newTitle,newTitleIndex) {

		if(typeof(newTitleIndex) == "undefined")
			return false;

		if(typeof(newTitle) == "undefined")
			newTitle = "<no data>";

		var dataObj = {}; 

		$("#dropdown-box option").each(function(i){

        	if($(this).val() == 'no_title' || $(this).val() == 'add_title')
        		return true;

        	ID = $(this).val();
        	title = $(this).text();
        	dataObj[ID] = title;
    	});

    	dataObj[newTitleIndex] = newTitle;

    	createTitleDropdown(dataObj,newTitleIndex);
	};

	resetForm = function() {

		// window.location.href = _editUrl + "/addDonorView/" + anonymousView;
		
		$("#fname_input_box").val('');
		$("#lName_input_box").val('');
		$("#org_input_box").val('');
		$("#addr1_input_box").val('');
		$("#addr2_input_box").val('');
		$("#city_input_box").val('');
		$("#state_input_box").val('');
		$("#zip_input_box").val('');
		$("#country_input_box").val('USA');
		$("#phone_input_box").val('');
		$("#email_input_box").val('');
		$("#description_area").val('');

		//$("#gift-date-box").val('');
		$('#gift-date-box').attr('value', dateUtils.getCurrentDate());

		$("#gift_quantity_box").val('');

		$("#important-checkbox").prop('checked',false);
		$("#skip-letter-checkbox").prop('checked',false);

		$("#title-dropdown>option:eq(0)").attr('selected', 'true');
	};

	return {

		initPage: function(anonymous) {	
			initPage(anonymous);
		},
		createTitleDropdown: function(titleData,index) {	
			createTitleDropdown(titleData,index);
		},
		toggleSubmitMessage: function() {
			toggleSubmitMessage();
		},
		showAddTitleBox: function() {
			showAddTitleBox();
		},
		removeAddTitleBox: function(newTitle,newTitleIndex) {
			removeAddTitleBox(newTitle,newTitleIndex);
		},
		setMessage: function(message) {
			setMessage(message);
		},
		resetForm: function() {
			resetForm();
		}
	};

}(jQuery)); // addNewDonorView()


editDonorView = (function($) {

	var initPage,
		setActiveGift,
		addEvents,
		setRole,
		toggleSubmitMessage,
		setMessage,
		createTitleDropdown,
		showAddTitleBox,
		removeAddTitleBox,
		enterNewTitle,
		createGiftDateDropDown,
		setGiftFormData,
		setDonorFormData,
		getTitleDropdownEntries;

	initPage = function() {

		$(".content-window").css("height", "780px");

		$("#page-label").text("View / Edit Donor Info");

		$("#add_info_message").hide();
		$("#title-edit-box").hide();
		$('#gift-date-box').hide();
		//$("#important-check-box").hide();

		$("#add_info_button").html("Update");

		$("#description_area").prop('disabled', 'true');
		$("#gift_quantity_box").prop('disabled', 'true');
		$("#important-checkbox").prop('disabled', 'true');
		$("#skip-letter-checkbox").prop('disabled', 'true');

		// Set user-specific layout
		setRole(viewUtils.getProfile().roleID);

		addEvents();
		form.addDonorDBEditFormValidation();

		utils.getGiftDatesForActiveDonor(createGiftDateDropDown); 
		utils.getActiveDonorData(setDonorFormData);
		utils.getGiftData(setGiftFormData);

		viewUtils.setUserLabel();
	};

	setActiveGift = function() {

		var giftID = $("#gift-date-box-dropdown>option:selected").val();

		if(giftID == "" || giftID == null)
			giftID = -1; 

		utils.setActiveGift(giftID,setGiftFormData);
	};

	addEvents = function() {

		$("#donor-input-form").validate({

	        errorClass: "invalid",
	        onkeyup: function(element) {},
	        onfocusout: false,
	        submitHandler: function() {

	            if(confirm("Are you sure?")) {

	            	utils.submitDonorEdit();
	            	$('#add_info_message').html("Updating donor info...");   
	            	toggleSubmitMessage();
	            } 
	        },
	        errorPlacement: function(error, element) {

				//error.appendTo('#errordiv');
				alert(error.html());
			}
	    });

	    // Change a selection in the title dropdown
	    $("#dropdown-box").change( function() {

	    	var titleVal = $("#title-dropdown").val();
	    	if(titleVal == "add_title")
	    		showAddTitleBox();
	    });

	    // Disable the enter keypress from submitting the form.  It will submit a new title once it has been entered in the text box
	    $('#donor-input-form').on('keypress',function(e){
		    var p = e.which;
		    if(p==13){
		        e.preventDefault();
		        return false;
		    }
		});

		// Change a selection in the date dropdown
		$("#gift-date-box-section").change( function() {

	    	setActiveGift();
	    });

	    $("#edit-gift-button").click( function() {

	    	window.location.href = _editUrl + "/editGiftView";
	    });

	    $("#gen_letter_button").click( function() {

	    	utils.getActiveGift(viewUtils.displayLetter);
	    });

	    $("#back_button").click( function() {

	    	viewUtils.onClickBack();
	    });
	};

	// Set layout for user status.
	setRole = function(roleID) {

		switch(roleID) {

			case 1: 	// Acquisitions
				
				
				// TODO: Display any kind of message or task list in the table section.  Or 'DONOWT'

				// set app title text: |5?
				$("#gen_letter_button").hide();

				break;

			case 2: 	// Admin

				$("#skip-letter-check-box").hide();
				
				break;

			case 3: 	// External Relations

				$("#skip-letter-check-box").hide();
				$("#gen_letter_button").hide();
				
				break;

			default:
				
				break;
		}
	};

	toggleSubmitMessage = function() {

		$("#add_info_message").toggle();
	};

	setMessage = function(message) {

		$("#add_info_message").html(message);
	};

	createTitleDropdown = function(titleData,index) {

		var dropdown;

		if(typeof(index) == "undefined")
			index = 0;

		dropdown = "<select class='input-medium' id='title-dropdown' name='title'><option value='no_title'></option>";
		dropdown += "<option value='add_title'>[Add New Title]</option>";

		$.each(titleData, function (key, value) {
			
			if(key == index) 
				dropdown += "<option selected value='" + key + "'>" + value + "</option>";
			else 
				dropdown += "<option value='" + key + "'>" + value + "</option>";
		} );

		dropdown += "</select>";

		$("#dropdown-box").html(dropdown);
	};

	createGiftDateDropDown = function(giftDates) {

		var dropdownHTML = '<select class="input-medium" id="gift-date-box-dropdown">';
			activeGift = giftDates['activeGiftID'];

		$.each(giftDates, function (key, value) {

			if(key == "activeGiftID") 
				return true;

			if(key == activeGift) 
				dropdownHTML += "<option selected value='" + key + "'>" + value + "</option>";
						
			else
				dropdownHTML += "<option value='" + key + "'>" + value + "</option>";

		} );

		dropdownHTML += '</select>';

		$("#gift-date-box-section").html(dropdownHTML);

		//setActiveGift();
		//utils.getGiftData(setGiftFormData);
	};

	// Remove dropdown and add box to enter a new title.  Add handlers to submit new title data
	showAddTitleBox = function() {

		$("#dropdown-box").hide();
		$("#title-edit-box").val("");
		$("#title-edit-box").show();

		// Enter key event
		$('#title-edit-box').on('keypress',function(e){
		    var p = e.which;
		    if(p==13){

		        enterNewTitle();
		        return false;
		    }
		});

		// Submit data in the input box once the focus leaves the box
		$('#title-edit-box').on('focusout',function(){

		    enterNewTitle();
		});

		$("#title-edit-box").focus();
	};

	// Remove edit box and repopulate the dropdown, selecting the newly added title
	removeAddTitleBox = function() {

		$("#dropdown-box").show();
		$("#title-edit-box").hide();

		// Remove the handlers
		$('#title-edit-box').off('keypress');
		$('#title-edit-box').off('focusout');

		$("#title-edit-box").blur();
	};

	enterNewTitle = function() {

		boxText = $("#title-edit-box").val();

		if(boxText != "" && boxText != null) {

			utils.submitNewTitle(boxText,insertTitleToDropdownList);
		}
		else 
			$("#title-dropdown>option:eq(0)").attr('selected', 'true'); // select top index

		removeAddTitleBox();
	};

	// Returns an object with all of the ID:title pairs that are currently in the dropdown box
	insertTitleToDropdownList = function(newTitle,newTitleIndex) {

		if(typeof(newTitleIndex) == "undefined")
			return false;

		if(typeof(newTitle) == "undefined")
			newTitle = "<no data>";

		var dataObj = {}; 

		$("#dropdown-box option").each(function(i){

        	if($(this).val() == 'no_title' || $(this).val() == 'add_title')
        		return true;

        	ID = $(this).val();
        	title = $(this).text();
        	dataObj[ID] = title;
    	});

    	dataObj[newTitleIndex] = newTitle;

    	createTitleDropdown(dataObj,newTitleIndex);
	};

	setGiftFormData = function(giftData) {

		$("#gift_quantity_box").val(giftData['giftQuantity']);

		$("#description_area").text(giftData['giftDescription']);

		$("#letter-status").html("Letter Status: " + giftData['letterStatus']);
		
		if(giftData['letterStatus'] === "Sent") {
			$('#skip-letter-check-box').hide();
		}
		else {

			if(giftData['bypassLetter'] == 1) 
				$('#skip-letter-checkbox').prop('checked', true);
			else 
				$('#skip-letter-checkbox').prop('checked', false);
		}

		if(giftData['importantFlag'] == 1) 
			$('#important-checkbox').prop('checked', true);
		else 
			$('#important-checkbox').prop('checked', false);

		
	};

	setDonorFormData = function(donorData) {

		var titleID = donorData['titleID'];

		utils.getTitleArray(createTitleDropdown,titleID);

		$("#title-dropdown>option:selected").val(donorData['titleID']);		
		$("#fname_input_box").val(donorData['firstName']);
		$("#lName_input_box").val(donorData['lastName']);
		$("#org_input_box").val(donorData['org']);
		$("#addr1_input_box").val(donorData['addr1']);
		$("#addr2_input_box").val(donorData['addr2']);
		$("#city_input_box").val(donorData['city']);
		$("#state_input_box").val(donorData['state']);
		$("#zip_input_box").val(donorData['zip']);
		$("#country_input_box").val(donorData['country']);
		$("#phone_input_box").val(donorData['phone']);
		$("#email_input_box").val(donorData['email']);
	};

	return {

		initPage: function() {	
			initPage();
		},
		createTitleDropdown: function(titleData,index) {	
			createTitleDropdown(titleData,index);
		},
		toggleSubmitMessage: function() {
			toggleSubmitMessage();
		},
		showAddTitleBox: function() {
			showAddTitleBox();
		},
		removeAddTitleBox: function(newTitle,newTitleIndex) {
			removeAddTitleBox(newTitle,newTitleIndex);
		},
		setGiftFormData: function(giftData) {
			setGiftFormData(giftData);
		},
		setDonorFormData: function(donorData) {
			setDonorFormData(donorData);
		},
		setMessage: function(message) {
			setMessage(message);
		},
		createGiftDateDropDown: function(giftDates) {	
			createGiftDateDropDown(giftDateData);
		}
	};

}(jQuery)); // editDonorView()


statisticsView = (function($) {

	var isIE = $.browser.msie ? true : false,
		MAX_TD_CHARS = 35;

	var initPage,
		addEvents,
		createGiftTable,
		toggleResultsView;

	initPage = function() {

		$(".content-window").css("height", "515px");
		$(".pre-scrollable").css("max-height", "400px");
		$("#table-section").css("height", "430px");

		$("#page-label").text("Statistics");

		$("#search_return").hide();
		$("#table-section").hide();
		$("#post-search-buttons").hide();
		$("#alert-section-label").hide();
		$("#details-search-check").hide();
		$("#details_search_label").hide();

		$("#search_submit").text('Get Statistics');
		$("#search_submit").css('margin-left', '425px');

		$('#anonymous-gift-check').removeAttr('checked'); // Bug 207: Hard remove of check with each page load...

		addEvents();
		form.addDonorDBSearchFormValidation();

		viewUtils.setUserLabel();

		// If there are search results cached, display them in the results view now.
		// This cache array is set externally (in utils).  It should always be null until temporarily set by utils.
		// The previous search results are also cached on the server, and are always available via ajax request. (search/recordSearch?searchType=reload)
		var searchResults = JSON.parse(sessionStorage.getItem('search_results'));
		if(searchResults != null) {

			reloadSearchResults(searchResults);
			sessionStorage.setItem('search_results', null);
		}
	};

	addEvents = function() {

		var fromDate, 
			toDate,
			anonymous;

		$("#search-form").validate({

	       // Handler
	        errorClass: "invalid",
	        onkeyup: function(element) {$(element).valid()},
	        onfocusout: false,
	        submitHandler: function() {

	        	anonymous = $("#anonymous-gift-check").val();

	        	if(anonymous == '1') {

	        		utils.getStatistics(createGiftTable,"anonymous");
	        	}
	        	else {

		        	utils.getStatistics(createGiftTable,"gift");
	        	}
	        },
	        errorPlacement: function(error, element) {

				//error.appendTo('#errordiv');
				alert(error.html());
			}
		});

		$("#anonymous-gift-check").click(function() { 

	    	if($("#anonymous-gift-check").val() == '0') {

	    		$("#anonymous-gift-check").val('1');
	    		$("#lname_label").text('Search anonymous gift descriptions:');
	    		$("#lname_input_box").prop('placeholder', '');
	    		$("#fname_input_box").prop('disabled','true');
	    	}
	    	else {

	    		$("#anonymous-gift-check").val('0');
	    		$("#lname_label").text('Last Name or Organization:');
	    		$("#lname_input_box").prop('placeholder', 'Leave blank to search all donors');
	    		$("#fname_input_box").prop('disabled','false');
	    	}
	    });

	    $("#search_return").click(function() { 

	    	toggleResultsView(true);
	    });

	    $("#search_new").click(function() { 

	    	window.location.href = _statsUrl;
	    });
	};

	createGiftTable = function(tableData) {

		var results = '<table class="table table-bordered table-striped">',
			total = 0,
			totalDonations = 0;

		if(typeof tableData == "object") {

			$.each(tableData, function (key, value) {

				// Grab the quantity data
				if(key == "totalQuantity") {

					total = value;
					return true;
				}
				// Grab the quantity data
				if(key == "totalDonations") {

					totalDonations = value;
					return true;
				}

				results += '<tr>';
				results += '<td class="span1" style="text-align: center"> <a href="' + _editUrl + '/editGiftView/' + value.donorID + '/' + value.giftsID +'">Edit</a> </td>';

				results += '<td class="span2">' + value.giftDate + '</td>';

				if(value.lastName == "" || value.lastName == null)  {

					// ie: truncate td string manually.
					if(isIE && value.org.length > MAX_TD_CHARS) {

						var trunc = value.org.substring(0,MAX_TD_CHARS-1);
						trunc += "...";
						results += '<td class="span3 name-cell3">' + trunc + '</td>';
					}
					else
						results += '<td class="span3 name-cell3">' + value.org + '</td>';
				}
				else
					results += '<td class="span3 name-cell3">' + value.lastName + '</td>';

				results += '<td class="span3 name-cell3">' + value.firstName + '</td>';

				results += '<td class="span2">' + value.giftQuantity + '</td>';

				if(value.lastName != "Anonymous Donor") {
					results += '<td style="text-align: center"> <a href="' + _editUrl + '/addGiftView/' + value.donorID + '"></a> </td>';
				}
				else {
					results += '<td></td>';
				}
				
				results += '</tr>';

			} );
		}	
		else if(typeof tableData == "string") {

			// Display message only
			results = '<tr><td class="span12" style="text-align: center; font-weight: bold;">' + tableData + '</td></tr>';
		}	

		results += '</table>';

		toggleResultsView(true);
		$("#table-header").html("<thead> <th class='span1'><!--SPACE--></th> <th class='span2'>Gift Date</th> <th class='span3'>Last Name / Organization</th> <th class='span3'>First Name</th> <th class='span2'>Quantity</th> <th><!--SPACE--></th> </thead>");
		$("#table-content").html(results);

		$("#data-section-1").html('Total Donations: ' + totalDonations + '&nbsp&nbsp&nbsp&nbsp&nbspTotal Gifts: ' + total);
	};

	toggleResultsView = function(showButtons) {

		if(showButtons)
			$("#post-search-buttons").toggle();

		$("#table-section").toggle();

		if($("#search-form").is(":visible")) {
			$("#home-window").css('height', '750px');
		}
		else {
			$("#home-window").css('height', '515px');
		}

		$("#search-form").toggle();
		$("#search_return").toggle();
	};

	reloadSearchResults = function(tableData) {

		// Make sure tableData object is valid and of the proper format for the table
		if(typeof tableData == "object" && tableData["0"] != null) {

			// Detect search type based on giftsID state
			createGiftTable(tableData);

		}
		else if(typeof tableData == "string") {

			createGiftTable("Reload error: " + tableData);
		}
		else {

			createGiftTable("Reload error: Null tableData object");
		}	
	};

	return {

		initPage: function() {
		    initPage();
		},
		createGiftTable: function() {
			createGiftTable();
		},
		toggleResultsView: function() {
			toggleResultsView();
		}
	};

}(jQuery)); // statisticsView()


/*
 * 
 */
viewUtils = (function($) {

	var getPage,
		getList,
		getPrevPage,
		setUserLabel,
		displayLetter;

	getPage = function() {

		return $("meta[name=page]").attr("content");
	};

	getPrevPage = function() {

		var prevUrl = document.referrer,
			length = document.referrer.length;

		var ch;
		for(var i = length - 1; i > 0; i--) {

			ch = prevUrl.charAt(i);
			if(ch == '/')
				break;
		}

		return prevUrl.substring((i + 1), length);
	};

	getProfile = function() {

		return JSON.parse(sessionStorage.getItem('donorDB_profile'));
	};

	// Sets the user name string / adds logout link
	setUserLabel = function() {

		var profile = viewUtils.getProfile();

		//$("#username-label").html("Welcome, " + fname + " " + lname + "&nbsp&nbsp&nbsp&nbsp<a onclick='authentication.logout();'>Logout</a>");		
		$("#username-label").html("Welcome, " + profile.firstName + " " + profile.lastName);
	};

	updateLetterStatus = function() {

		if($("#status-change-sent").attr("checked") === "checked") {

			// Set to 'sent'
			utils.setLetterStatus(0);
			$("#letter-status").html("Letter Status: Sent");
			$("#status-change-controls").hide();
		}
		else if($("#status-change-pending").attr("checked") === "checked") {

			// Set to 'pending'
			utils.setLetterStatus(1);
			$("#letter-status").html("Letter Status: Pending");
			$("#status-change-controls").hide();
		}
		else {

			alert("Error updating letter status, status not changed.  Please contact systems support if this issue can not be resolved.");
		}
	};

	displayLetter = function(id) {

		letter.generateLetter(id);

		//getList();
	};

	getList = function() {

		var profile = getProfile();
		switch(profile.roleID) {

			case 2:

				utils.getNewDonationList(searchView.setQueue); 

			break;

			case 3:

				utils.getTypedLetterRequests(searchView.setQueue);

			break;

			default:
				// log error
		}
	};

	onClickBack = function() {

		//alert(getPrevPage());
		switch(getPrevPage()) {

			case "search":

				// Reload previous search result
                utils.loadPreviousSearchResults("search");

			break;

			case "statisticsView":

				// Reload previous statistics request
				utils.loadPreviousSearchResults("statistics");

			break;

			// case "browseDonors":

			// 	// Reload previous browse section
			// 	alert("onclickback: browse");

			// break;

			default:

				// Reload previous url
				window.history.back();

			break;
		}
	};

	return {

		getPage: function() {
			return getPage();
		},
		getPrevPage: function() {
			return getPrevPage();
		},
		getProfile: function() {
			return getProfile();
		},
		setUserLabel : function() {
			setUserLabel();
		},
		updateLetterStatus: function() {
			updateLetterStatus();
		},
		displayLetter: function(id) {
			displayLetter(id);
		},
		getList: function() {
			getList();
		},
		onClickBack: function() {
			onClickBack();
		}
	};

}(jQuery)); // viewUtils()
