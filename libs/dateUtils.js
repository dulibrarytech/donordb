dateUtils = (function($) {

	var getCurrentDate;

	getCurrentDate = function() {

		var date = new Date(),
			month = date.getMonth() + 1; 

		if(month < 10)
			month = "0" + month;

		return date.getFullYear() + "-" + month + "-" + date.getDate();
	};

	return {
        
        getCurrentDate: function() {
            return getCurrentDate();
        }
    };

}(jQuery));


