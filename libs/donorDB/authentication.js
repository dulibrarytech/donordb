/*
 * Donor Application
 *
 * Authentication Functions
 *
 * Author: Jeff Rynhart
 * 
 * University of Denver, June 2013
 */

authentication = (function($) {

	var validateSession;

	validateSession = function() {

		if(sessionStorage.login == null) {

			//$( "#dialog-form" ).dialog( "open" );
		}
	};

	return {

		validateSession: function() {
			validateSession();
		}
	};

}(jQuery));