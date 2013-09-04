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
		validateLocalSession,
		authenticate,
		validateResponse,
		setUserRole;

	/*   
	 * Runs initPage().  If session active and valid, will then run setRole() on the page based on the session roleID.
	 * If the session is null or invalid, loads the login dialog
	 */
	validateSession = function() {

	  	requestObj = {
            url: _loginUrl + "/getSessionProfile",
            dataType: "json",
            cache: true,
            success: function (response) { 

            	if(response == null || response.isValid === "false") {
            		loginForm.doModal();
            	}
            	else {
            		searchView.setRole(response);
            	}
            },
            error: function ( textStatus, errorThrown ) {
                alert( "validateSession error: " + errorThrown );
            }
        };

	  	$.ajax(requestObj);
	};

	validateLocalSession = function() {

		var profile = JSON.parse(sessionStorage.getItem('donorDB_profile'));
		return (profile != null && profile['isValid'] == true)
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

                if(validateResponse(response)) {
                	sessionStorage.setItem("donorDB_profile", JSON.stringify(response));
                	searchView.setRole(response);
     				loginForm.closeDlg();
                }
                else {
                	sessionStorage.donorDB_profile = null;
                	alert("Failed to authenticate " + response['userName']);
                	loginForm.resetForm();
                }
            },
            error: function ( textStatus, errorThrown ) {
                alert( "authenticate error: " + errorThrown );
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
		validateLocalSession: function() {
			validateLocalSession();
		},
		authenticate: function(loginData) {

			authenticate(loginData);
		}
	};

}(jQuery));



