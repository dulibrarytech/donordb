/*
 * Donor Application
 *
 * View layout scripts / ajax functions
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

		addEvents();
	};

	addEvents = function() {

		$("#search-form").validate({

	        errorClass: "invalid",
	        submitHandler: function() {
	            //submitSearch();
	            alert("submit search");
	        }
	    });
	};

	return {

		initPage: function() {	
			initPage();
		}
	};

}(jQuery));


browseDonorsView = (function($) {

	var initPage,
		getData,

		tableData;

	initPage = function() {

		$(".generic-label").text("Donor Listing");
		$("#table-header").html("<thead> <th class='span2'><!--SPACE--></th> <th class='span4'>First Name</th> <th class='span4'>Last Name</th> <th><!--SPACE--></th> </thead>");

		getData();
	};

	setLayout = function(results) {

		$("#table-content").html(results);
	};

	getData = function() {

		utils.requestAllDonorData();
	};

	return {

		initPage: function() {
			initPage();
		},
		setLayout: function(results) {
			setLayout(results);
		}
	};

}(jQuery));


addGiftView = (function($) {

	var initPage,
		loadDonor,
		addEvents;

	initPage = function() {

		$('#select_donor_button').attr('disabled', 'disabled');
		$('#gift_submit_button').attr('disabled', 'disabled');

		$(".generic-label").text("Add a Gift");

		$('#display-donor-section').hide();

		$(".content-window").css("height", "580px");

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

}(jQuery))


giftDetailsView = (function($) {

	var initPage;

	initPage = function() {

		$(".generic-label").text("Gift Details");

		$('#select-donor-section').hide();
		$('#gift_submit_button').hide();

		$('#gift_date_box').attr('placeholder', '');

		$(".content-window").css("height", "580px");
	};

	return {

		initPage: function() {	
			initPage();
		}
	};

}(jQuery));