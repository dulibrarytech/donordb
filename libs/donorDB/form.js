form = (function($) {

	var addDonorDBSearchFormValidation,
		addDonorDBEditFormValidation,
		addDonorDBGiftFormValidation;

	addDonorDBSearchFormValidation = function() {

		$( "#lname_input_box" ).rules( "add", {
			maxlength: 150,
			messages: {
			    maxlength: "Last Name or Organization: Character limit exceeded (150)"
			}
		});

		// At this point, these rules are conflicting with the jquery datepicker plugin. 9/2013
		// The plugin will prevent non numeric characters from being entered
		$( "#fromDate" ).rules( "add", {
			
		});

		$( "#toDate" ).rules( "add", {
			
		});
	};

	addDonorDBEditFormValidation = function() {

		$( "#fname_input_box" ).rules( "add", {
			required: true,
			maxlength: 35,
			messages: { 
				required: "Please enter a first name",
				maxlength: "First name: Character limit exceeded (75)"
			}
		});

		$( "#lName_input_box" ).rules( "add", {
			required: true,
			maxlength: 35,
			messages: {
			    required: "Please enter a last name",
			    maxlength: "Last Name: Character limit exceeded (75)"
			}
		});

		$( "#org_input_box" ).rules( "add", {
			maxlength: 150,
			messages: {
			    maxlength: "Organization: Character limit exceeded (150)"
			}
		});

		$( "#addr1_input_box" ).rules( "add", {
			required: true,
			maxlength: 255,
			messages: {
			    required: "Please enter an address",
			    maxlength: "Address 1: Character limit exceeded (255)"
			}
		});

		$( "#addr2_input_box" ).rules( "add", {
			maxlength: 255,
			messages: {
			    maxlength: "Address 2: Character limit exceeded (255)"
			}
		});

		$( "#city_input_box" ).rules( "add", {
			required: true,
			maxlength: 75,
			messages: {
			    required: "Please enter a city",
			    maxlength: "City: Character limit exceeded (75)"
			}
		});

		$( "#state_input_box" ).rules( "add", {
			required: true,
			maxlength: 75,
			messages: {
			    required: "Please enter a state",
			    maxlength: "State: Character limit exceeded (75)"
			}
		});

		$( "#zip_input_box" ).rules( "add", {
			number: true,
			maxlength: 50,
			messages: {
				maxlength: "Postal code: Character limit exceeded (50)",
			    number: "Postal code: Must be a number"
			}
		});

		$( "#country_input_box" ).rules( "add", {
			maxlength: 75,
			messages: {
			    maxlength: "Country: Character limit exceeded (75)"
			}
		});

		$( "#phone_input_box" ).rules( "add", {
			//number: true,
			maxlength: 25,
			messages: {
			    maxlength: "Phone number: Character limit exceeded (25)"//,
			    //number: "Phone number: Must be a number"
			}
		});

		$( "#email_input_box" ).rules( "add", {
			maxlength: 100,
			email: true,
			messages: {
			    maxlength: "Email: Character limit exceeded (100)",
			    email: "Please enter a valid email address"
			}
		});

		$( "#description_area" ).rules( "add", {
			maxlength: 255,
			required: true,
			messages: {
			    maxlength: "Gift Description: Character limit exceeded (255)",
			    required: "Please enter a gift description"
			}
		});

		$( "#gift-date-box" ).rules( "add", {
			// date: true,
			// maxlength: 15,
			// messages: {
			//     maxlength: "CGift Date: Character limit exceeded (20)"

			// }
		});

		$( "#gift_quantity_box" ).rules( "add", {
			number: true,
			required: true,
			maxlength: 10,
			messages: {
			    maxlength: "Gift Quantity: Character limit exceeded (10)",
			    number: "Gift Quantity: Must be a number",
			    required: "Please enter a gift quantity"
			}
		});
	};

	addDonorDBGiftFormValidation = function() {

		$( "#gift_quantity_box" ).rules( "add", {
			number: true,
			required: true,
			maxlength: 10,
			messages: {
			    maxlength: "Gift Quantity: Character limit exceeded (10)",
			    number: "Gift Quantity: Must be a number",
			    required: "Please enter a gift quantity"
			}
		});

		$( "#gift-date-box" ).rules( "add", {
			// date: true,
			// maxlength: 12,
			// messages: {
			    

			// }
		});

		$( "#gift_description_box" ).rules( "add", {
			maxlength: 255,
			required: true,
			messages: {
			    maxlength: "Gift Description: Character limit exceeded (255)",
			    required: "Please enter a gift description"
			}
		});

		$( "#edit-date-box" ).rules( "add", {
			// date: true,
			// maxlength: 12,
			// messages: {
			    

			// }
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