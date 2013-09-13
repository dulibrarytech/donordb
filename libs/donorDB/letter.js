
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

	createPopupWindow = function(letterText) {

		popup = initPopupWindow();

        newDocument = popup.document;
        newDocument.write(letterText);
        newDocument.close();
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
				alert("success. response: " + letterText);
				//createPopupWindow(letterText);
			},
			error: function ( textStatus, errorThrown ) {
                alert( errorThrown );
            }
		};

		doAjax(requestObj);
	};

	return {

		generateLetter: function(giftID) {
			generateLetter(giftID);
		},
		createPopupWindow: function(letterText) {
			createPopupWindow(letterText);
		}
	}; 

}(jQuery));