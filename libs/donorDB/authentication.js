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
		alert("VS");
		if(sessionStorage.login != null) {

			
		}
		else {


		}
	};

	return {

		validateSession: function() {
			validateSession();
		}
	};

}(jQuery));