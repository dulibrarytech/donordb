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

	  	// Get session profile from server
	  	var userProfile = null;

	  	// Go to login dialog if session is null or invalid
	  	if(userProfile == null || userProfile.isValid === "false") {

          	loginForm.doModal();
	  	}
	};

	authenticate = function(loginData) {

	  	var qstring = "userName=" + loginData.userName + "&passWord=" + loginData.passWord;

	  	requestObj = {
            type: "POST",
            url: _loginUrl,
            data: qstring,
            dataType: "json",
            cache: true,
            success: function (response) {
                alert("success");
                if(validateResponse(response)) {
					alert("success valid");
                	sessionStorage.setItem("
                		", JSON.stringify(response));
                	searchView.setRole(response.roleID);
                }
                else {
                	alert("success invalid");
                	sessionStorage.donorDB_profile = null;
                	// MESSAGE 'Authentication failed'
                	loginForm.resetForm();
                }
            },
            error: function ( textStatus, errorThrown ) {
                alert( errorThrown );
            }
        };	

        //$.ajax(requestObj);
	};

	validateResponse = function(response) {

		if(typeof response.isValid != "undefined") {
			return response.isValid;
		}
		else
			return false;
	};

	return {

		validateSession: function() {

			validateSession();
		},
		authenticate: function(loginData) {

			authenticate(loginData);
		}
	};

}(jQuery));



