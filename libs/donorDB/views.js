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
		createResultsTable,
		toggleResultsView;

	initPage = function() {

		$(".content-window").css("height", "500px");
		$(".pre-scrollable").css("max-height", "315px");
		$("#table-section").css("height", "405px");

		$(".generic-label").text("Search Records");

		$("#table-header").html("<thead> <th class='span2'><!--SPACE--></th> <th class='span4'>Last Name</th> <th class='span4'>First Name</th> <th><!--SPACE--></th> </thead>");
		$("#search_return").hide();
		$("#table-section").hide();
		$("#post-search-buttons").hide();

		addEvents();
	};

	addEvents = function() {

		$("#search-form").validate({

	        errorClass: "invalid",
	        submitHandler: function() {

	            utils.submitSearch(createTable);
	        }
	    });

	    $("#search_return").click(function() { 

	    	toggleResultsView();
	    });

	    $("#search_new").click(function() { 

	    	utils.resetSearch();
	    });
	};

	createTable = function(tableData) {

		var results = '<table class="table table-bordered table-striped">';

		results = '<table class="table table-bordered table-striped">'; 

		if(typeof tableData == "object") {

			$.each(tableData, function (key, value) {
				
				results += '<tr>';
				results += '<td class="span2" style="text-align: center"> <a href="' + _editUrl + '/editDonor/' + value.donorID + '">Edit</a> </td>';

				results += '<td class="span4">' + value.lastName + '</td>';
				results += '<td class="span4">' + value.firstName + '</td>';

				results += '<td style="text-align: center"> <a href="' + _editUrl + '/addGift/' + value.donorID + '">Add Gift</a> </td>';
				results += '</tr>';

			} );
		}	
		else if(typeof tableData == "string") {

			// Display message
			results = '<tr><td class="span12" style="text-align: center; font-weight: bold;">' + tableData + '</td></tr>';
		}	

		results += '</table>';

		toggleResultsView();
		$("#table-content").html(results);
	};

	toggleResultsView = function() {

		$("#search-form").toggle();
		$("#table-section").toggle();
		$("#search_return").toggle();
		$("#post-search-buttons").toggle();

		if( $(".content-window").css("height") == "500px" ) 
			$(".content-window").css("height", "600px");
		else 
			$(".content-window").css("height", "500px");
	};

	return {

		initPage: function() {	
			initPage();
		},
		createResultsTable : function(tableData) {
			createResultsTable(tableData);
		}
	};

}(jQuery)); // searchView()


browseDonorsView = (function($) {

	var initPage,
		createTable;

	initPage = function() {

		$(".content-window").css("height", "710px");
		$(".pre-scrollable").css("max-height", "420px");

		$(".generic-label").text("Donor Listing");

		$("#table-header").html("<thead> <th class='span2'><!--SPACE--></th> <th class='span4'>Last Name</th> <th class='span4'>First Name</th> <th><!--SPACE--></th> </thead>");

		utils.getDonorDataArray(createTable);
	};

	createTable = function(tableData) {

		var results = '<table class="table table-bordered table-striped">';

		results = '<table class="table table-bordered table-striped">'; 

		$.each(tableData, function (key, value) {
			
			results += '<tr>';
			results += '<td class="span2" style="text-align: center"> <a href="' + _editUrl + '/editDonor/' + value.donorID + '">Edit</a> </td>';

			results += '<td class="span4">' + value.lastName + '</td>';
			results += '<td class="span4">' + value.firstName + '</td>';

			results += '<td style="text-align: center"> <a href="' + _editUrl + '/addGift/' + value.donorID + '">Add Gift</a> </td>';
			results += '</tr>';

		} );

		results += '</table>';

		$("#table-content").html(results);
	};

	return {

		initPage: function() {
			initPage();
		},
		createTable: function(tableData) {
			createTable(tableData);
		}
	};

}(jQuery)); // browseDonorsView()


addGiftView = (function($) {

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

}(jQuery)) // addGiftView()


giftDetailsView = (function($) {

	var initPage;

	initPage = function() {

		$(".content-window").css("height", "580px");

		$(".generic-label").text("Gift Details");

		$('#select-donor-section').hide();
		$('#gift_submit_button').hide();

		$('#gift_date_box').attr('placeholder', '');
	};

	return {

		initPage: function() {	
			initPage();
		}
	};

}(jQuery)); // giftDetailsView()


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
		}
	};

}(jQuery)); // addNewDonorView()


