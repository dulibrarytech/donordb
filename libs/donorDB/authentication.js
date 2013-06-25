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

          loginForm.doModal();

          // have validated username.  check against local user db, and return roleid and userid
		  }
	};

	return {

		  validateSession: function() {
			   validateSession();
		  }
	};

}(jQuery));



