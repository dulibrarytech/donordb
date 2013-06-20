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

		$("#page-label").text("Search Donors");


		//authentication.validateSession();
	};

	//TODO: Authenticate here

	return {

		initPage: function() {	
			initPage();
		}
	};

}(jQuery));