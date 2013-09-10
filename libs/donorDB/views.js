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

	var LOGOUT_PATH = "login/logout";

	var initPage,
		initSession,
		addEvents,
		setRole,
		setUserLabel,
		resetSearch,
		createNewDonationList,
		createDonorTable,
		createGiftTable,
		toggleResultsView;

	initPage = function() {

		$(".content-window").css("height", "425px");
		$(".pre-scrollable").css("max-height", "315px");
		$("#table-section").css("height", "405px");

		$(".generic-label").text("Search Records");

		$("#search_return").hide();
		$("#table-section").hide();
		$("#post-search-buttons").hide();

		$("#list-section").hide(); 

		$("#new-donations-link").hide();
		$("#settings-link").css("border", "none");

		addEvents();
	};

	initSession = function() {

		if(authentication.validateLocalSession())
		{
			var profile = JSON.parse(sessionStorage.getItem('donorDB_profile'));

			setRole(profile.roleID);
			setUserLabel(profile.firstName,profile.lastName);
		}
	}

	addEvents = function() {

		var fromDate, 
			toDate,
			anonymous;

		$("#search-form").validate({

	        errorClass: "invalid",
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
				
				break;

			case 2: 	// Admin

				$("#new-donations-link").show();
				$("#settings-link").css("border-right", "1px solid #D0C8AC");
				
				break;

			case 3: 	// External Relations

				
				break;

			default:
				
				break;
		}
	};

	// Sets the user name string / adds logout link
	setUserLabel = function(fname,lname) {

		$("#username-label").html("Welcome, " + fname + " " + lname + "&nbsp&nbsp&nbsp&nbsp<a href='" + LOGOUT_PATH + "'>Logout</a>");		
	};

	resetSearch = function() {

		window.location.href = _searchUrl;
	};

	createNewDonationList = function(tableData) {

		var results = '<table class="table table-bordered table-striped">'; 

		if(typeof tableData == "object") {

			$.each(tableData, function (key, value) {
				
				results += '<tr>';
				results += '<td class="span1" style="text-align: center"> <a href="' + _editUrl + '/editGiftView/' + value.donorID + '/' + value.giftsID +'">Edit</a> </td>';

				results += '<td class="span2">' + value.giftDate + '</td>';

				if(value.lastName == "" || value.lastName == null)
					results += '<td class="span4">' + value.org + '</td>';
				else
					results += '<td class="span4">' + value.lastName + '</td>';

				results += '<td class="span4">' + value.firstName + '</td>';

				results += '<td style="text-align: center"> <a href="' + _editUrl + '/generateLetter/' + value.giftID + '">Letter</a> </td>';
				results += '</tr>';
			} );
		}	
		else if(typeof tableData == "string") {

			// Display message only
			results = '<tr><td class="span12" style="text-align: center; font-weight: bold;">' + tableData + '</td></tr>';
		}

		results += '</table>';

		toggleResultsView(false);
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
					results += '<td class="span4">' + value.org + '</td>';
				else
					results += '<td class="span4">' + value.lastName + '</td>';
				
				results += '<td class="span4">' + value.firstName + '</td>';

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

			$.each(tableData, function (key, value) {
				
				results += '<tr>';
				results += '<td class="span1" style="text-align: center"> <a href="' + _editUrl + '/editGiftView/' + value.donorID + '/' + value.giftsID +'">Edit</a> </td>';

				results += '<td class="span2">' + value.giftDate + '</td>';

				if(value.lastName == "" || value.lastName == null)
					results += '<td class="span4">' + value.org + '</td>';
				else
					results += '<td class="span4">' + value.lastName + '</td>';

				results += '<td class="span4">' + value.firstName + '</td>';

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
		$("#table-header").html("<thead> <th class='span1'><!--SPACE--></th> <th class='span2'>Gift Date</th> <th class='span4'>Last Name / Organization</th> <th class='span4'>First Name</th> <th><!--SPACE--></th> </thead>");
		$("#table-content").html(results);
	};

	toggleResultsView = function(showButtons) {

		$("#search-form").toggle();
		$("#table-section").toggle();
		$("#search_return").toggle();

		if(showButtons)
			$("#post-search-buttons").toggle();

		if( $(".content-window").css("height") == "425px" ) 
			$(".content-window").css("height", "600px");
		else 
			$(".content-window").css("height", "425px");
	};

	return {

		initPage: function() {	
			initPage();
		},
		initSession: function() {
			initSession();
		},
		createDonorTable : function(tableData) {
			createResultsTable(tableData);
		},
		createGiftTable : function(tableData) {
			createGiftTable(tableData);
		},
		createNewDonationList : function(tableData) {
			createNewDonationList(tableData);
		},
		setUserLabel : function(fname,lname) {
			setUserLabel(fname,lname);
		}
	};

}(jQuery)); // searchView()


browseDonorsView = (function($) {

	var initPage,
		createDonorTable;

	initPage = function() {

		$(".content-window").css("height", "710px");
		$(".pre-scrollable").css("max-height", "420px");

		$(".generic-label").text("Donor Listing");

		$("#table-header").html("<thead> <th class='span2'><!--SPACE--></th> <th class='span4'>Last Name / Organization</th> <th class='span4'>First Name</th> <th><!--SPACE--></th> </thead>");

		utils.getDonorDataArray(createDonorTable); 
	};

	createDonorTable = function(tableData) {

		var results = '<table class="table table-bordered table-striped">';

		results = '<table class="table table-bordered table-striped">'; 

		$.each(tableData, function (key, value) {



			results += '<tr>';
			results += '<td class="span2" style="text-align: center"> <a href="' + _editUrl + '/editDonorView/' + value.donorID + '">Edit</a> </td>';

			if(value.lastName == "" || value.lastName == null)	
				results += '<td class="span4">' + value.org + '</td>';	
			else
				results += '<td class="span4">' + value.lastName + '</td>';

			results += '<td class="span4">' + value.firstName + '</td>';

			results += '<td style="text-align: center"> <a href="' + _editUrl + '/addGiftView/' + value.donorID + '">Add Gift</a> </td>';
			results += '</tr>';

		} );

		results += '</table>';

		$("#table-content").html(results);
	};

	return {

		initPage: function() {
			initPage();
		},
		createDonorTable: function(tableData) {
			createDonorTable(tableData);
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

	initPage = function() {

		$(".content-window").css("height", "600px");

		$(".generic-label").text("View / Edit Gift");

		$('#gift_submit_button').html("Update");

		$('#add_info_message').hide();
		$("#gift-date-box").hide();
		$("#add_anon_info_button").hide();

		addEvents();

		utils.getGiftDatesForActiveDonor(createGiftDateDropDown);
		utils.getGiftData(setGiftFormData);
	};

	addEvents = function() {

		$("#add-gift-form").validate({

	        errorClass: "invalid",
	        submitHandler: function() {

	        	if(confirm("Are you sure?")) {

	        		utils.submitGiftEdit();
	            	$('#add_info_message').html("Updating gift info...");
	            	toggleSubmitMessage();
	            }
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

		initPage: function() {	
			initPage();
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

	initPage = function() {

		$(".content-window").css("height", "600px");

		$(".generic-label").text("Add a Gift");
		$('#gift-date-box').attr('value', dateUtils.getCurrentDate());

		$('#gift_submit_button').html("Add Gift");
		$('#add_info_message').html("Adding new gift info...");

		$('#add_info_message').hide();
		$(".change_date_elts").hide();
		$("#add_anon_info_button").hide();

		utils.getActiveNameString(setNameString);

		addEvents();
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
	        submitHandler: function() {

	        	utils.submitGift();
	            $('#add_info_message').html("Adding new gift info...");
	            toggleSubmitMessage();
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

		initPage: function() {	
			initPage();
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
		resetForm,

		anonymousView = 0;

	initPage = function(anonymous) {

		anonymousView = anonymous;

		$(".content-window").css("height", "740px");

		if(anonymous == 1) {

			$(".generic-label").text("Add Anonymous Donor Info");
			$("#lower_well").hide();
			$(".content-window").css("height", "555px");
		}		
		else {

			$(".generic-label").text("Add New Donor Info");
			$(".content-window").css("height", "740px");
		}
			

		$("#add_info_message").hide();
		$("#title-edit-box").hide();
		$("#edit-gift-button").hide();

		$('#gift-date-box').attr('value', dateUtils.getCurrentDate());
		$("#description_area").prop('enabled', 'true');
		$("#gift_quantity_box").prop('enabled', 'true');

		$("#add_info_button").html("Save");

		addEvents(anonymous);

		utils.getTitleArray(createTitleDropdown);
	};

	addEvents = function(anonymous) {

		$("#donor-input-form").validate({

	        errorClass: "invalid",
	        submitHandler: function() {

	            utils.submitNewDonorInfo(anonymous);
	            $('#add_info_message').html("Adding new donor info...");
	            toggleSubmitMessage();
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

		$(".content-window").css("height", "740px");

		$(".generic-label").text("View / Edit Donor Info");

		$("#add_info_message").hide();
		$("#title-edit-box").hide();
		$('#gift-date-box').hide();

		$("#add_info_button").html("Update");

		$("#description_area").prop('disabled', 'true');
		$("#gift_quantity_box").prop('disabled', 'true');

		addEvents();

		utils.getGiftDatesForActiveDonor(createGiftDateDropDown); 
		utils.getActiveDonorData(setDonorFormData);
		utils.getGiftData(setGiftFormData);
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
	        submitHandler: function() {

	            if(confirm("Are you sure?")) {

	            	utils.submitDonorEdit();
	            	$('#add_info_message').html("Updating donor info...");   
	            	toggleSubmitMessage();
	            } 
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


/*
 * @return Name of .html file that the current page was loaded from
 */
viewUtils = (function($) {

	var getPage;

	getPage = function() {

		return $("meta[name=page]").attr("content");
	};

	return {

		getPage: function() {
			return getPage();
		}
	};

}(jQuery)); // viewUtils()
