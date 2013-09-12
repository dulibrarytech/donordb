
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
		generateLetter;

	initPopupWindow = function() {

		return window.open();
	};

	generateLetter = function(giftID) {
		
		popup = initPopupWindow();
		newDocument = popup.document;

		letterText = 

		newDocument.write(letterText);
		newDocument.close();
	};

	return {

		generateLetter: function(giftID) {
			generateLetter(giftID);
		}
	}; 

}(jQuery));