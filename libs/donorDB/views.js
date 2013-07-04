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
		addEvents;

	initPage = function() {

		$(".content-window").css("height", "500px");

		$(".generic-label").text("Search Records");

		$("#table-section").hide();

		addEvents();
	};

	addEvents = function() {

		$("#search-form").validate({

	        errorClass: "invalid",
	        submitHandler: function() {

	            utils.submitSearch(createResultsTable);
	        }
	    });
	};

	createResultsTable = function(tableData) {

		alert(tableData);
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
		getData,

		tableData;

	initPage = function() {

		$(".content-window").css("height", "645px");

		$(".generic-label").text("Donor Listing");

		$("#table-header").html("<thead> <th class='span2'><!--SPACE--></th> <th class='span4'>First Name</th> <th class='span4'>Last Name</th> <th><!--SPACE--></th> </thead>");

		$(".pre-scrollable").css("max-height", "390px");

		utils.getDonorDataArray(createTable);
	};

	createTable = function(tableData) {

		var results = '<table class="table table-bordered table-striped">';

		results = '<table class="table table-bordered table-striped">'; 

		$.each(tableData, function (key, value) {
			
			results += '<tr>';
			results += '<td class="span2" style="text-align: center"> <a href="' + _editUrl + '/editDonor/' + value.donorID + '">Edit</a> </td>';

			results += '<td class="span4">' + value.firstName + '</td>';
			results += '<td class="span4">' + value.lastName + '</td>';

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


addDonorInfoView = (function($) {

	var initPage,
		createTitleDropdown;

	initPage = function() {

		$(".content-window").css("height", "740px");

		$(".generic-label").text("Add New Donor Info");

		utils.getTitleArray(createTitleDropdown);
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

}(jQuery)); // addDonorInfoView()


