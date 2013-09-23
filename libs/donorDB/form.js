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
			required: true,
			maxlength: 255,
			messages: { 

			}
		});

		$( "#lName_input_box" ).rules( "add", {
			required: true,
			maxlength: 255,
			messages: {
			    
			}
		});

		$( "#org_input_box" ).rules( "add", {
			maxlength: 255,
			messages: {
			    
			}
		});

		$( "#addr1_input_box" ).rules( "add", {
			required: true,
			maxlength: 255,
			messages: {
			    
			}
		});

		$( "#addr2_input_box" ).rules( "add", {
			maxlength: 255,
			messages: {
			    
			}
		});

		$( "#city_input_box" ).rules( "add", {
			required: true,
			maxlength: 50,
			messages: {
			    
			}
		});

		$( "#state_input_box" ).rules( "add", {
			required: true,
			maxlength: 50,
			messages: {
			    
			}
		});

		$( "#zip_input_box" ).rules( "add", {
			number: true,
			maxlength: 20,
			messages: {
			    
			}
		});

		$( "#country_input_box" ).rules( "add", {
			maxlength: 50,
			messages: {
			    
			}
		});

		$( "#phone_input_box" ).rules( "add", {
			number: true,
			maxlength: 11,
			messages: {
			    
			}
		});

		$( "#email_input_box" ).rules( "add", {
			maxlength: 255,
			email: true,
			messages: {
			    
			    email: "Please enter a valid email address"
			}
		});

		$( "#description_area" ).rules( "add", {
			maxlength: 255,
			messages: {
			    

			}
		});

		$( "#gift-date-box" ).rules( "add", {
			date: true,
			maxlength: 255,
			messages: {
			    

			}
		});

		$( "#gift_quantity_box" ).rules( "add", {
			number: true,
			maxlength: 10,
			messages: {
			    

			}
		});
	};

	addDonorDBGiftFormValidation = function() {

		$( "#gift_quantity_box" ).rules( "add", {
			number: true,
			maxlength: 10,
			messages: {
			    

			}
		});

		$( "#gift-date-box" ).rules( "add", {
			date: true,
			maxlength: 12,
			messages: {
			    

			}
		});

		$( "#gift_description_box" ).rules( "add", {
			maxlength: 255,
			messages: {
			    

			}
		});

		$( "#edit-date-box" ).rules( "add", {
			date: true,
			maxlength: 12,
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