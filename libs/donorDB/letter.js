
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

		popup = window.open();
	};

	generateLetter = function(giftID) {
		
		newwindow=window.open('_top');
		newdocument=newwindow.document;
		newdocument.write('Hello World.');
		
		setTimeout(function(){newdocument.close();},1000);

		

	};

	return {

		generateLetter: function(giftID) {
			generateLetter(giftID);
		}
	}; 

}(jQuery));