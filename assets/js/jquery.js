
$(function() {
    $( "#fromDate" ).datepicker({ 

    	altField: "#fromDate", 
    	altFormat: "yy-mm-dd",
        changeYear: true,
        changeMonth: true,
        yearRange: "c-100:c+10" 
    });


    $( "#toDate" ).datepicker({

    	altField: "#toDate", 
    	altFormat: "yy-mm-dd",
        changeYear: true,
        changeMonth: true,
        yearRange: "c-100:c+10"
    });

    $( "#gift-date-box" ).datepicker({

        altField: "#gift-date-box", 
        altFormat: "yy-mm-dd"
    });

    $( "#edit-date-box" ).datepicker({

        altField: "#edit-date-box", 
        altFormat: "yy-mm-dd"
    });
});


$(function() {
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
});
