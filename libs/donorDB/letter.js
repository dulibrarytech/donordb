
/*
 * Donor Application
 *
 * 'Thank You Letter' Functions
 *
 * Author: Jeff Rynhart
 * 
 * University of Denver, September 2013
 */

letter = (function($) {

	var initPopupWindow,
		createPopupWindow,
		generateLetter,
		getLetterText;

	initPopupWindow = function() {

		return window.open();
	};

	createPopupWindow = function(text,ID) {

		popup = initPopupWindow();
 
        setTimeout( function() {
	        if(!popup || popup.outerHeight === 0) {
	            //First Checking Condition Works For IE & Firefox
	            //Second Checking Condition Works For Chrome
	            alert("Pop-up blocker is turned on!  \n\nPlease disable your pop-up blocker for this site, and re-click the 'Letter' link to generate the letter.");
	        }
	        else {

	            utils.setLetterComplete(ID);

	            newDocument = popup.document;
	            letterText = text.substring(0, text.length - 4);

	            newDocument.write(letterText);
	            newDocument.close();
	        }
	    }, 500);
	};

	generateLetter = function(giftID) {

		getLetterText(giftID);
	};

	getLetterText = function(giftID) {

		requestObj = {

			type: "POST",
			data: "giftID=" + giftID, 
			url: _searchUrl + '/getLetter',
			dataType: "text",
			cache: true,
			success: function(letterText) {

				createPopupWindow(letterText,giftID);
			},
			error: function ( textStatus, errorThrown ) {
                alert( errorThrown + ": Error in client letter request" );
            }
		};

		$.ajax(requestObj);
	};

	return {

		generateLetter: function(giftID) {
			generateLetter(giftID);
		}
	}; 

}(jQuery));