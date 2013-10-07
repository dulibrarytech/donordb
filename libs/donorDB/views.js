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

	var initPage,
		initSession,
		addEvents,
		setRole,
		setQueue,
		getQueue,
		resetSearch,
		createAlertList,
		createDonorTable,
		createGiftTable,
		toggleResultsView;

	initPage = function() {

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

		$('#anonymous-gift-check').removeAttr('checked'); // Bug 207: Hard remove of check with each page load...

		addEvents();
		form.addDonorDBSearchFormValidation();
	};

	initSession = function() {

		if(authentication.validateLocalSession())
		{
			var profile = viewUtils.getProfile(),
				queue = getQueue();

			setRole(profile.roleID);

			// If the queue is empty, set it here.  List is created in getList()
			if(queue == "Queue Empty.") {

				viewUtils.getList();
			}
			else {

				createAlertList(queue);
			}	

			viewUtils.setUserLabel();
		}
		else {
			alert("Local session not validated.  Please contact systems support if there is a problem logging in.");
			authentication.logout();
			//window.location.replace(_serverErrorView);
			//window.location.href = _searchUrl;
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

	        	fromDate	= $("#fromDate").val();
	        	toDate 		= $("#toDate").val();
	        	anonymous 	= $("#anonymous-gift-check").val();

	        	if(anonymous == '1') {
	        		utils.submitSearch(createGiftTable,"anonymous");
	        	}
	        	else {

	        		//If a date field has been populated, search results should display gifts by date.  If not, display donor results
		        	if(fromDate != "" || toDate != "") {
		        		utils.submitSearch(createGiftTable,"gift");
		        	}
		        	else {
		        		utils.submitSearch(createDonorTable,"donor");
		        	}
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
	    	}
	    	else {

	    		$("#anonymous-gift-check").val('0');
	    		$("#lname_label").text('Last Name or Organization:');
	    		$("#lname_input_box").prop('placeholder', 'Leave blank to search all donors');
	    	}
	    });

	    $("#search_return").click(function() { 

	    	toggleResultsView(true);
	    });

	    $("#search_new").click(function() { 

	    	resetSearch();
	    });
	};

	// Set layout for user status.
	setRole = function(roleID) {

		switch(roleID)
		{
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

				if(value.lastName == "" || value.lastName == null)
					results += '<td class="span4 name-cell">' + value.org + '</td>';
				else
					results += '<td class="span4 name-cell">' + value.lastName + '</td>';

				results += '<td class="span4 name-cell">' + value.firstName + '</td>';

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

				if(value.lastName == "" || value.lastName == null)
					results += '<td class="span4 name-cell">' + value.org + '</td>';
				else
					results += '<td class="span4 name-cell">' + value.lastName + '</td>';
				
				results += '<td class="span4 name-cell">' + value.firstName + '</td>';

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
				}
				else {
					addLinkText = "Add Gift";
				}

				results += '<tr>';
				results += '<td class="span1" style="text-align: center"> <a href="' + _editUrl + '/editGiftView/' + value.donorID + '/' + value.giftsID +'">Edit</a> </td>';

				results += '<td class="span2">' + value.giftDate + '</td>';

				if(value.lastName == "" || value.lastName == null) 
					results += '<td class="span3 name-cell">' + value.org + '</td>';
				else
					results += '<td class="span3 name-cell">' + value.lastName + '</td>';

				results += '<td class="span3 name-cell">' + value.firstName + '</td>';

				results += '<td class="span2">' + value.letterStatus + '</td>';

				if(value.lastName != "Anonymous Donor") {
					results += '<td style="text-align: center"> <a href="' + _editUrl + '/addGiftView/' + value.donorID + '">' + addLinkText + '</a> </td>';
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

		// Resize the window for the acquisitions user.  At this point, there is no alert section 
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
		else if(profile.roleID == 2 || profile.roleID == 3) {

			$("#alert-section-label").toggle(); 

			createAlertList(getQueue());
		}

		$("#search-form").toggle();
		$("#search_return").toggle();
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
		createAlertList : function(tableData) {
			createAlertList(tableData);
		}
	};

}(jQuery)); // searchView()


browseDonorsView = (function($) {

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

		$("#table-header").html("<thead> <th class='span2'><!--SPACE--></th> <th class='span4'>Last Name / Organization</th> <th class='span4'>First Name</th> <th><!--SPACE--></th> </thead>");

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

				if(value.lastName == "" || value.lastName == null)	
					results += '<td class="span4 name-cell">' + value.org + '</td>';	
				else
					results += '<td class="span4 name-cell">' + value.lastName + '</td>';

				results += '<td class="span4 name-cell">' + value.firstName + '</td>';

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

	var initPage,
		addEvents,
		blockForm,
		setMessage,
		unblockForm,
		setNameString,
		setGiftFormData,
		toggleSubmitMessage,
		createGiftDateDropDown;

	initPage = function(anonymous) {

		$(".content-window").css("height", "630px");

		$("#page-label").text("View / Edit Gift");

		$('#gift_submit_button').html("Update");

		$('#add_info_message').hide();
		$("#gift-date-box").hide();
		$("#add_anon_info_button").hide();

		if(anonymous) {
			$("#important_gift_check").hide();
		}

		addEvents();
		form.addDonorDBGiftFormValidation();

		utils.getGiftDatesForActiveDonor(createGiftDateDropDown);
		utils.getGiftData(setGiftFormData);

		viewUtils.setUserLabel();
	};

	addEvents = function() {

		$("#add-gift-form").validate({

	        errorClass: "invalid",
	        onkeyup: function(element) {$(element).valid()},
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

		$("#letter-status").html("Letter Status: " + giftData['letterStatus']);

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

	var initPage,
		setNameString,
		toggleSubmitMessage,
		setMessage,
		addEvents,
		resetForm;

	initPage = function(anonymous) {

		$(".content-window").css("height", "630px");

		$("#page-label").text("Add a Gift");
		$('#gift-date-box').attr('value', dateUtils.getCurrentDate());

		$('#gift_submit_button').html("Add Gift");
		$('#add_info_message').html("Adding new gift info...");

		$('#add_info_message').hide();
		$(".change_date_elts").hide();
		$("#add_anon_info_button").hide();

		if(anonymous) {
			$("#important_gift_check").hide();
		}

		utils.getActiveNameString(setNameString);

		addEvents();
		form.addDonorDBGiftFormValidation();

		viewUtils.setUserLabel();
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
	        onkeyup: function(element) {$(element).valid()},
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

		$(".content-window").css("height", "760px");

		// Not in use
		if(anonymous == 1) {

			$("#page-label").text("Add Anonymous Donor Info");
			$("#lower_well").hide();
			$(".content-window").css("height", "555px");
			$("#important_gift_check").hide();
		}		
		else {

			$("#page-label").text("Add New Donor Info");
			$(".content-window").css("height", "740px");
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

	            alert("hit handler");

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
		        e.preventDefault();
		        return false;
		    }
		});

		// Disable name constraints if an organization name has been entered
		// $('#org_input_box').on('focusout',function(){

		//     var orgText = $('#org_input_box').val();
		//     if(orgText == "") {

		//   //   	$( "#fName_input_box" ).rules( "add", {
		// 		// 	required: true
		// 		// });

		// 		// $( "#lName_input_box" ).rules( "add", {
		// 		// 	required: true
		// 		// });
		//     }
		//     else {

		//     	alert("removing");

		// 		$( "#fName_input_box" ).rules( "remove", "max" );

		// 		$( "#lName_input_box" ).rules( "remove", "max" );

		// 		//alert($("#donor-input-form").valid());
		// 		alert("post remove...");
		//     }
		// });
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

		window.location.href = _editUrl + "/addDonorView/" + anonymousView;
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

		$(".content-window").css("height", "760px");

		$("#page-label").text("View / Edit Donor Info");

		$("#add_info_message").hide();
		$("#title-edit-box").hide();
		$('#gift-date-box').hide();

		$("#add_info_button").html("Update");

		$("#description_area").prop('disabled', 'true');
		$("#gift_quantity_box").prop('disabled', 'true');
		$("#important-checkbox").prop('disabled', 'true');

		var profile = viewUtils.getProfile();
		if(profile.roleID != 2) {
			$("#gen_letter_button").hide();
		}

		if(viewUtils.getPrevPage() != "search")
			$("#return_button").hide();

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
	        onkeyup: function(element) {$(element).valid()},
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

	    $("#return_button").click( function() {

	    	alert("return...");
	    });
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
		utils.getGiftData(setGiftFormData);
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

	var initPage,
		addEvents,
		createGiftTable,
		toggleResultsView;

	initPage = function() {

		$(".content-window").css("height", "520px");
		$(".pre-scrollable").css("max-height", "400px");
		$("#table-section").css("height", "390px");

		$("#page-label").text("Statistics");

		$("#search_return").hide();
		$("#table-section").hide();
		$("#post-search-buttons").hide();
		$("#alert-section-label").hide();

		$("#search_submit").text('Get Statistics');
		$("#search_submit").css('margin-left', '450px');

		$('#anonymous-gift-check').removeAttr('checked'); // Bug 207: Hard remove of check with each page load...

		addEvents();
		form.addDonorDBSearchFormValidation();

		viewUtils.setUserLabel();
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
			total = 0;

		if(typeof tableData == "object") {

			$.each(tableData, function (key, value) {

				// Skip the quantity data
				if(key == "totalQuantity") {

					total = value;
					return true;
				}

				results += '<tr>';
				results += '<td class="span1" style="text-align: center"> <a href="' + _editUrl + '/editGiftView/' + value.donorID + '/' + value.giftsID +'">Edit</a> </td>';

				results += '<td class="span2">' + value.giftDate + '</td>';

				if(value.lastName == "" || value.lastName == null) 
					results += '<td class="span3 name-cell">' + value.org + '</td>';
				else
					results += '<td class="span3 name-cell">' + value.lastName + '</td>';

				results += '<td class="span3 name-cell">' + value.firstName + '</td>';

				results += '<td class="span2">' + value.giftQuantity + '</td>';

				if(value.lastName != "Anonymous Donor") {
					results += '<td style="text-align: center"> <a href="' + _editUrl + '/addGiftView/' + value.donorID + '"></a> </td>';
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

		$("#data-section-1").html('Total Gifts: ' + total);
	};

	toggleResultsView = function(showButtons) {

		if(showButtons)
			$("#post-search-buttons").toggle();

		$("#table-section").toggle();

		if($("#search-form").is(":visible")) {
			$("#home-window").css('height', '720px');
		}
		else {
			$("#home-window").css('height', '520px');
		}

		$("#search-form").toggle();
		$("#search_return").toggle();
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
		displayLetter: function(id) {
			displayLetter(id);
		},
		getList: function() {
			getList();
		}
	};

}(jQuery)); // viewUtils()
