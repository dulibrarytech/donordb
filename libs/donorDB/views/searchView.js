/*
 * Donor Application
 *
 * Search view setup / ajax functions
 *
 * Author: Jeff Rynhart
 * 
 * University of Denver, June 2013
 */

searchView = (function($) {

	var initPage;

	initPage = function() {

		$("#table-section").hide();
		$(".content-window").css("height", "425px");

		$("#page-label").text("Search Donors");
	};

	return {

		initPage: function() {	
			initPage();
		}
	};

}(jQuery));