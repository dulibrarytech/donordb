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

	var validateSession,
		authenticate,
		validateResponse,
		setUserRole;


	validateSession = function() {

	  	searchView.initPage();
	  	
	  	requestObj = {
            url: _loginUrl + "/getSessionProfile",
            dataType: "json",
            cache: true,
            success: function (response) {
            	alert(response);
            	//setUserRole(response);
            },
            error: function ( textStatus, errorThrown ) {
                alert( errorThrown );
            }
        };

	  	$.ajax(requestObj);
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
                	sessionStorage.setItem("donorDB_profile", JSON.stringify(response));
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

        $.ajax(requestObj);
	};

	validateResponse = function(response) {

		if(typeof response.isValid != "undefined") {
			return response.isValid;
		}
		else
			return false;
	};

	// Run page setRole() function if the profile is valid, init login dialog if it is not.
	setUserRole = function(userProfile) {

	  	if(userProfile == null || userProfile.isValid === "false") {

          	loginForm.doModal();
	  	}
	  	else {

	  		searchView.setRole(sessionStorage.roleID);
	  	}
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



