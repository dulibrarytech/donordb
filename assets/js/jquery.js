
  	$(function() {
    	$( "#fromDate" ).datepicker({ 

    		altField: "#fromDate", 
    		altFormat: "yy-mm-dd" 
    	});


    	$( "#toDate" ).datepicker({

    		altField: "#toDate", 
    		altFormat: "yy-mm-dd"
    	});

        $( "#gift-date-box" ).datepicker({

            altField: "#gift-date-box", 
            altFormat: "yy-mm-dd"
        });
  	});
