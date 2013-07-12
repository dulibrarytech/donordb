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

	    	utils.resetSearch();
	    });
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
				results += '<td class="span1" style="text-align: center"> <a href="' + _editUrl + '/editGift/' + value.giftsID + '">Edit</a> </td>';

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


newGiftView = (function($) {

	var initPage,
		loadDonor,
		addEvents;

	initPage = function() {

		$(".content-window").css("height", "590px");

		$(".generic-label").text("Add a Gift");

		$('#select_donor_button').attr('disabled', 'disabled');
		$('#gift_submit_button').attr('disabled', 'disabled');

		$('#display-donor-section').hide();
		$("#new_donor_button").css("visibility", "hidden");

		addEvents();
	};

	loadDonor = function(donorID) {

		alert("load donor" + donorID);
	};

	addEvents = function() {

		$('#donor_select_box').focus(function() {


		});

		$('#donor_select_box').focusout(function() {

			
		});
	};

	return {

		initPage: function() {	
			initPage();
		},
		loadDonor: function(donorID) {	
			loadDonor(donorID);
		}
	};

}(jQuery)) // newGiftView()


addGiftView = (function($) {

	var initPage;

	initPage = function() {

		$(".content-window").css("height", "600px");

		$(".generic-label").text("Add a Gift");

		$('#select-donor-section').hide();

		$('#gift_date_box').attr('placeholder', '');

		utils.getActiveNameString(setNameString);
	};

	setNameString = function(name) {

		$("#donor-name-label").text(name);
	};

	return {

		initPage: function() {	
			initPage();
		},
		setNameString: function(name) {	
			setNameString(name);
		}
	};

}(jQuery)); // addGiftView()


addNewDonorView = (function($) {

	var initPage,
		addEvents,
		createTitleDropdown;

	initPage = function() {

		$(".content-window").css("height", "740px");

		$(".generic-label").text("Add New Donor Info");

		$("#add_donor_message").hide();

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

		$("#add_donor_message").toggle();
	};

	createTitleDropdown = function(tableData) {

		var dropdown = "<select class='input-medium' name='title'><option selected='yes' value='no_title'></option>";

		$.each(tableData, function (key, value) {
			
			dropdown += "<option>" + value.title + "</option>";

		} );

		dropdown += "<option>[Add New Title]</option>";
		dropdown += "</select>";

		$("#dropdown-box").html(dropdown);
	};

	return {

		initPage: function() {	
			initPage();
		},
		createTitleDropdown: function(tableData) {	
			createTitleDropdown(tableData);
		},
		toggleSubmitMessage: function() {
			toggleSubmitMessage();
		}
	};

}(jQuery)); // addNewDonorView()


