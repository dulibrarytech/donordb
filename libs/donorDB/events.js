function donorEvents() {

	// $('#submit_lname').click( function () {

	// 	submitLName();
	// });

	// $("#last-name-input").submit( function() {

	// 	submitLName();
	// });

	$("#last-name-input").validate({

        errorClass: "invalid",
        rules: {
	
  		}
        submitHandler: function(form) {
        	
            submitLName(form);
        }
    });

}