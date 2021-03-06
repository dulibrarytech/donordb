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
		setUserRole,
		getUserRole,
		logout;

	/*   
	 * Runs initPage().  If session active and valid, will then run setRole() on the page based on the session roleID.
	 * If the session is null or invalid, loads the login dialog
	 */
	validateSession = function(callback=null) {
		requestObj = {
            url: _loginUrl + "/getSessionProfile",
            dataType: "json",
            cache: true,
            success: function (response) { 
            	if(response == null || response.isValid === "false") {
            		loginForm.doModal(callback);
            	}
            	else {
            		if(validateLocalSession() == false) {
	            		//sessionStorage.setItem("donorDB_profile", JSON.stringify(response));
	            		logout();
	            	}
	            	else {
	            		if(callback) {
		            		callback(true);
		            	}
		            	else {
		            		searchView.initSession();
		            	}
	            	}
            	}
            },
            error: function ( textStatus, errorThrown ) {
                alert( "validateSession error: " + errorThrown + " See console log for status");
                window.location.replace(_serverErrorView);
            }
        };

	  	utils.doAjax(requestObj);
	};

	validateLocalSession = function() {

		var profile = JSON.parse(sessionStorage.getItem('donorDB_profile'));

		return (profile != null && profile['isValid'] == true)
	};

	authenticate = function(loginData, callback=null) {
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
                	if(callback) {
                		callback(true);
                	}
                	else {
                		searchView.initSession();
                	}
     				loginForm.closeDlg();
                }
                else {
                	sessionStorage.clear();
                	alert("Failed to authenticate " + response['userName']);
                	loginForm.resetForm();
                }
            },
            error: function ( textStatus, errorThrown ) {
                alert( "authenticate error: " + errorThrown );
            }
        };	

        utils.doAjax(requestObj);
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

	  		searchView.setRole(userProfile.roleID);
	  	}
	};

	getUserRole = function() {

		var profile = JSON.parse(sessionStorage.getItem('donorDB_profile'));

		return profile.roleID;
	};

	logout = function() {

		sessionStorage.clear();

		window.location.href = _logoutUrl;
	};

	return {

		validateSession: function(callback) {
			validateSession(callback);
		},
		validateLocalSession: function() {
			return validateLocalSession();
		},
		authenticate: function(loginData, callback) {
			authenticate(loginData, callback);
		},
		setUserRole: function() {
			setUserRole();
		},
		getUserRole: function() {
			return getUserRole();
		},
		logout: function() {
			logout();
		}
	};

}(jQuery));



