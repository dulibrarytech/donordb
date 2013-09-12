
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

		return window.open('_top');
	};

	generateLetter = function(giftID) {
		
		popup = initPopupWindow();





		newdocument=newwindow.document;
		newdocument.write('Hello World. ' + giftID);
		
		newdocument.close()

		

	};

	return {

		generateLetter: function(giftID) {
			generateLetter(giftID);
		}
	}; 

}(jQuery));