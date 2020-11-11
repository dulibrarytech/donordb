/*
*	Popup login form functions (jquery)
*/
loginForm = (function($) {

    var name = $( "#name" ),
      email = $( "#email" ),
      password = $( "#password" ),
      allFields = $( [] ).add( name ).add( email ).add( password ),
      onAuthenticateCallback = null,
      tips = $( ".validateTips" );
 
    function updateTips( t ) {
      tips
        .text( t )
        .addClass( "ui-state-highlight" );
      setTimeout(function() {
        tips.removeClass( "ui-state-highlight", 1500 );
      }, 500 );
    }
 
    function checkLength( o, n, min, max ) {
      if ( o.val().length > max || o.val().length < min ) {
        o.addClass( "ui-state-error" );
        updateTips( "Length of " + n + " must be between " +
          min + " and " + max + "." );
        return false;
      } else {
        return true;
      }
    }
 
    function checkRegexp( o, regexp, n ) {
      if ( !( regexp.test( o.val() ) ) ) {
        o.addClass( "ui-state-error" );
        updateTips( n );
        return false;
      } else {
        return true;
      }
    }

    function doModal(callback=null) {
	console.log("TEST doModal()val of oac", onAuthenticateCallback)
      onAuthenticateCallback = callback;
	console.log("TEST doModal() assigned val to oac", onAuthenticateCallback)
      $( "#dialog-form" ).dialog( "open" );
    }

    function closeDlg() {

      $( "#dialog-form" ).dialog( "close" );
    }

    function resetForm() {

      $( "#name" ).val("");
      $( "#password" ).val("");
    }

    function validateFormInput() {

      var userName = $( "#name" ).val(),
          passWord = $( "#password" ).val(),
          bValid = true;

          bValid = bValid && checkLength( userName, "username", 3, 30 );
          bValid = bValid && checkLength( passWord, "password", 5, 16 );

          return bValid;
    }

    function authenticateFormData() {

        var MAX_USERNAME = 30,
            MAX_PASSWORD = 30;

        userName = $( "#name" ).val(),
        passWord = $( "#password" ).val();

        // Validate
        var valid = true;
        if (userName.length > MAX_USERNAME) {
          alert("Exceeded max characters allowed for username (" + MAX_USERNAME + ")");
          valid = false;
        }
        if (passWord.length > MAX_PASSWORD) {
          alert("Exceeded max characters allowed for password (" + MAX_PASSWORD + ")");
          valid = false;
        }
          
        return valid;
    }

 	  /*
	  *	Popup login form (jquery) 
    * TODO: validation
	  */
    $( "#dialog-form" ).dialog({
      autoOpen: false,
      height: 250,
      width: 305,
      modal: true,
      buttons: {
        Submit: function() {

            allFields.removeClass( "ui-state-error" );
		console.log("TEST dialog() oac val is", onAuthenticateCallback)
            if(authenticateFormData()) {
              authentication.authenticate({userName: userName, passWord: passWord}, onAuthenticateCallback); 
            }         
          }
        }
    });

    // Submit on enter
    $( "#dialog-form" ).keypress(function( event ) {
        if ( event.which == 13 ) { 

           if(authenticateFormData()) {
              authentication.authenticate({userName: userName, passWord: passWord}, onAuthenticateCallback); 
           }
            
        }
    });

    return {

      doModal: function(callback) {          
          doModal(callback);
      },
      closeDlg: function() {          
          closeDlg();
      },
      resetForm: function() {          
          resetForm();
      }
    };

}(jQuery));
