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

	var initPage;

	initPage = function() {

		$("#table-section").hide();
		$(".content-window").css("height", "500px");

		$("#page-label").text("Search Records");
	};

	return {

		initPage: function() {	
			initPage();
		}
	};

}(jQuery));


resultsView = (function($) {

	var initPage;

	initPage = function() {

		
	};

	return {

		initPage: function() {	
			initPage();
		}
	};

}(jQuery));


addGiftView = (function($) {

	var initPage;

	initPage = function() {

		$('#select_donor_button').attr('disabled', 'disabled');
		$('#gift_submit_button').attr('disabled', 'disabled');

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