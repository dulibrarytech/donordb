form = (function($) {

	var addDonorDBSearchFormValidation,
		addDonorDBEditFormValidation,
		addDonorDBGiftFormValidation;

	addDonorDBSearchFormValidation = function() {

		$( "#lname_input_box" ).rules( "add", {
			maxlength: 255
			//onkeyup: false,
		});

		$( "#fromDate" ).rules( "add", {
			maxlength: 12
			//onkeyup: false,
		});

		$( "#toDate" ).rules( "add", {
			maxlength: 12
			//onkeyup: false,
		});
	};

	addDonorDBEditFormValidation = function() {

		$( "#fname_input_box" ).rules( "add", {
			maxlength: 255,
			messages: {

			}
		});

		$( "#lName_input_box" ).rules( "add", {
			required: true,
			maxlength: 255,
			messages: {
			    required: "Please enter a last name"
			}
		});

		$( "#org_input_box" ).rules( "add", {
			maxlength: 255,
			messages: {
			    
			}
		});

		$( "#" ).rules( "add", {
			maxlength: 255,
			messages: {
			    
			}
		});

		$( "#" ).rules( "add", {
			maxlength: 255,
			messages: {
			    
			}
		});

		$( "#" ).rules( "add", {
			maxlength: 255,
			messages: {
			    
			}
		});

		$( "#" ).rules( "add", {
			maxlength: 255,
			messages: {
			    
			}
		});

		$( "#" ).rules( "add", {
			maxlength: 255,
			messages: {
			    
			}
		});

		$( "#" ).rules( "add", {
			maxlength: 255,
			messages: {
			    
			}
		});
	};

	return {

		addDonorDBSearchFormValidation: function() {
			addDonorDBSearchFormValidation();
		},
		addDonorDBEditFormValidation: function() {
			addDonorDBEditFormValidation();
		},
		addDonorDBGiftFormValidation: function() {
			addDonorDBGiftFormValidation();
		}
	};

}(jQuery)); // form()