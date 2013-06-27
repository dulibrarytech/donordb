function donorEvents() {

	// Search Form submit
	$("#search-form").validate({

        errorClass: "invalid",
        submitHandler: function() {
            submitSearch();
        }
    });
}