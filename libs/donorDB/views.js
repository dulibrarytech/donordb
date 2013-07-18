/*
 * Donor Application
 *
 * Page layout scripts 
 *
 * Author: Jeff Rynhart
 * 
 * University of Denver, June 2013
 */

searchView = (function($) {

	var initPage,
		addEvents,
		resetSearch,
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

		addEvents();
	};

	addEvents = function() {

		var fromDate, 
			toDate;

		$("#search-form").validate({

	        errorClass: "invalid",
	        submitHandler: function() {

	        	fromDate = $("#fromDate").val();
	        	toDate = $("#toDate").val();

	        	// If a date field has been populated, search results should display gifts by date.  If not, display donor results
	        	if(fromDate != "" || toDate != "") {
	        		utils.submitSearch(createGiftTable,"gift");
	        	}
	        	else {
	        		utils.submitSearch(createDonorTable,"donor");
	        	}
	        }
	    });

	    $("#search_return").click(function() { 

	    	toggleResultsView();
	    });

	    $("#search_new").click(function() { 

	    	resetSearch();
	    });
	};

	resetSearch = function() {

		window.location.href = _searchUrl;
	};

	createDonorTable = function(tableData) {

		var results = '<table class="table table-bordered table-striped">'; 

		if(typeof tableData == "object") {

			$.each(tableData, function (key, value) {
				
				results += '<tr>';
				results += '<td class="span2" style="text-align: center"> <a href="' + _editUrl + '/editDonor/' + value.donorID + '">Edit</a> </td>';

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

		toggleResultsView();
		$("#table-header").html("<thead> <th class='span2'><!--SPACE--></th> <th class='span4'>Last Name</th> <th class='span4'>First Name</th> <th><!--SPACE--></th> </thead>");
		$("#table-content").html(results);
	};

	createGiftTable = function(tableData) {

		var results = '<table class="table table-bordered table-striped">';

		if(typeof tableData == "object") {

			$.each(tableData, function (key, value) {
				
				results += '<tr>';
				results += '<td class="span1" style="text-align: center"> <a href="' + _editUrl + '/editGiftView/' + value.donorID + '/' + value.giftsID +'">Edit</a> </td>';

				results += '<td class="span2">' + value.giftDate + '</td>';
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

		toggleResultsView();
		$("#table-header").html("<thead> <th class='span1'><!--SPACE--></th> <th class='span2'>Gift Date</th> <th class='span4'>Last Name</th> <th class='span4'>First Name</th> <th><!--SPACE--></th> </thead>");
		$("#table-content").html(results);
	};

	toggleResultsView = function() {

		$("#search-form").toggle();
		$("#table-section").toggle();
		$("#search_return").toggle();
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
		createDonorTable : function(tableData) {
			createResultsTable(tableData);
		},
		createGiftTable : function(tableData) {
			createGiftTable(tableData);
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

		$("#table-header").html("<thead> <th class='span2'><!--SPACE--></th> <th class='span4'>Last Name</th> <th class='span4'>First Name</th> <th><!--SPACE--></th> </thead>");

		utils.getDonorDataArray(createDonorTable);
	};

	createDonorTable = function(tableData) {

		var results = '<table class="table table-bordered table-striped">';

		results = '<table class="table table-bordered table-striped">'; 

		$.each(tableData, function (key, value) {
			
			results += '<tr>';
			results += '<td class="span2" style="text-align: center"> <a href="' + _editUrl + '/editDonor/' + value.donorID + '">Edit</a> </td>';

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
		unblockForm,
		setNameString,
		setGiftFormData,
		toggleSubmitMessage,
		createGiftDateDropDown;

	initPage = function() {

		$(".content-window").css("height", "600px");

		$(".generic-label").text("View / Edit Gift");

		$('#gift_submit_button').html("Update");
		$('#add_info_message').html("Updating data...");

		$('#add_info_message').hide();
		$("#gift-date-box").hide();

		addEvents();

		utils.getGiftDatesForActiveDonor(createGiftDateDropDown);
		utils.getGiftData(setGiftFormData);
	};

	addEvents = function() {

		$("#add-gift-form").validate({

	        errorClass: "invalid",
	        submitHandler: function() {

	        	utils.submitGiftEdit();
	        }
	    });

	    $("#dropdown-box-section").change( function() {

	    	var newDate = $("#dropdown-box").val();
			$("#edit-date-box").val(newDate);

	    	utils.changeActiveGift(newDate,setGiftFormData);
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

		$("#gift_quantity_box").attr('value', giftData['giftQuantity']);

		$("#gift_description_box").text(giftData['giftDescription']);

		if(giftData['importantFlag'] == 1)
			$("#important-checkbox").attr('checked', 'checked');

		setNameString(giftData['nameString']);
	};

	toggleSubmitMessage = function() {

		$("#add_info_message").toggle();
	};

	createGiftDateDropDown = function(giftDates) {

		var dropdownHTML = '<select class="input" id="dropdown-box">';
			activeGift = giftDates['activeGiftID'];

		$.each(giftDates, function (key, value) {

			if(key == "activeGiftID") 
				return true;

			if(key == activeGift)
				dropdownHTML += '<option selected="selected">' + value + "</option>";
			else
				dropdownHTML += '<option>' + value + "</option>";
		} );

		dropdownHTML += '</select>';

		$("#dropdown-box-section").html(dropdownHTML);
		var gdate = $("#dropdown-box").val();
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
		createGiftDateDropDown: function(giftDates) {	
			createGiftDateDropDown(giftDateData);
		}
	};

}(jQuery)) // editGiftView()


addGiftView = (function($) {

	var initPage,
		setNameString,
		toggleSubmitMessage,
		addEvents,
		resetForm;

	initPage = function() {

		$(".content-window").css("height", "600px");

		$(".generic-label").text("Add a Gift");
		$('#gift-date-box').attr('value', utils.getCurrentDate());

		$('#gift_submit_button').html("Add Gift");
		$('#add_info_message').html("Adding new gift info...");

		$('#add_info_message').hide();
		$(".change_date_elts").hide();

		utils.getActiveNameString(setNameString);

		addEvents();
	};

	setNameString = function(name) {

		$("#donor-name-label").text(name);
	};

	addEvents = function() {

		$("#add-gift-form").validate({

	        errorClass: "invalid",
	        submitHandler: function() {

	        	utils.submitGift();
	        }
	    });
	};

	toggleSubmitMessage = function() {

		$("#add_info_message").toggle();
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
		resetForm: function() {
			resetForm();
		}
	};

}(jQuery)); // addGiftView()


addNewDonorView = (function($) {

	var initPage,
		addEvents,
		toggleSubmitMessage,
		createTitleDropdown,
		resetForm;

	initPage = function() {

		$(".content-window").css("height", "740px");

		$(".generic-label").text("Add New Donor Info");

		$("#add_info_message").hide();

		$('#gift-date-box').attr('value', utils.getCurrentDate());
		$('#add_info_message').html("Adding new donor info...");

		addEvents();

		utils.getTitleArray(createTitleDropdown);
	};

	addEvents = function() {

		$("#donor-input-form").validate({

	        errorClass: "invalid",
	        submitHandler: function() {

	            utils.submitNewDonorInfo();
	        }
	    });
	};

	toggleSubmitMessage = function() {

		$("#add_info_message").toggle();
	};

	createTitleDropdown = function(titleData) {

		var dropdown = "<select class='input-medium' name='title'><option selected='yes' value='no_title'></option>";

		$.each(titleData, function (key, value) {
			
			dropdown += "<option>" + value.title + "</option>";

		} );

		dropdown += "<option>[Add New Title]</option>";
		dropdown += "</select>";

		$("#dropdown-box").html(dropdown);
	};

	resetForm = function() {

		window.location.href = _editUrl + "/addDonorView";
	};

	return {

		initPage: function() {	
			initPage();
		},
		createTitleDropdown: function(titleData) {	
			createTitleDropdown(titleData);
		},
		toggleSubmitMessage: function() {
			toggleSubmitMessage();
		},
		resetForm: function() {
			resetForm();
		}
	};

}(jQuery)); // addNewDonorView()


editDonorView = (function($) {

	var initPage,
		addEvents,
		toggleSubmitMessage,
		createTitleDropdown,
		createGiftDateDropDown,
		setDonorFormData;

	initPage = function() {

		$(".content-window").css("height", "740px");

		$(".generic-label").text("Add New Donor Info");

		$("#add_info_message").hide();

		$('#gift-date-box').attr('value', utils.getCurrentDate());
		$('#add_info_message').html("Adding new donor info...");

		addEvents();

		//utils.getTitleArray(createTitleDropdown);
		utils.getGiftDatesForActiveDonor(createGiftDateDropDown);
		utils.getGiftData(setGiftFormData);
	};

	addEvents = function() {

		$("#donor-input-form").validate({

	        errorClass: "invalid",
	        submitHandler: function() {

	            //utils.submitNewDonorInfo();
	        }
	    });
	};

	toggleSubmitMessage = function() {

		$("#add_info_message").toggle();
	};

	createTitleDropdown = function(titleData) {

		var dropdown = "<select class='input-medium' name='title'><option selected='yes' value='no_title'></option>";

		$.each(titleData, function (key, value) {
			
			dropdown += "<option>" + value.title + "</option>";

		} );

		dropdown += "<option>[Add New Title]</option>";
		dropdown += "</select>";

		$("#dropdown-box").html(dropdown);
	};

	createGiftDateDropDown = function(giftDates) {

		var dropdownHTML = '<select class="input" id="dropdown-box">';
			activeGift = giftDates['activeGiftID'];

		$.each(giftDates, function (key, value) {

			if(key == "activeGiftID") 
				return true;

			if(key == activeGift)
				dropdownHTML += '<option selected="selected">' + value + "</option>";
			else
				dropdownHTML += '<option>' + value + "</option>";
		} );

		dropdownHTML += '</select>';

		$("#dropdown-box-section").html(dropdownHTML);
		var gdate = $("#dropdown-box").val();
		$("#edit-date-box").val(gdate);
	};

	setDonorFormData = function(giftData) {

		



		// Gift section
		$("#gift_quantity_box").attr('value', giftData['giftQuantity']);

		$("#gift_description_box").text(giftData['giftDescription']);

		if(giftData['importantFlag'] == 1)
			$("#important-checkbox").attr('checked', 'checked');

		setNameString(giftData['nameString']);
	};

	return {

		initPage: function() {	
			initPage();
		},
		createTitleDropdown: function(titleData) {	
			createTitleDropdown(titleData);
		},
		toggleSubmitMessage: function() {
			toggleSubmitMessage();
		},
		createGiftDateDropDown: function(giftDates) {	
			createGiftDateDropDown(giftDateData);
		},
		setDonorFormData: function(giftData) {
			setDonorFormData(giftData);
		}
	};

}(jQuery)); // editDonorView()
