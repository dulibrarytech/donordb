/*
*	Popup login form functions (jquery)
*/
loginForm = (function($) {

    var name = $( "#name" ),
      email = $( "#email" ),
      password = $( "#password" ),
      allFields = $( [] ).add( name ).add( email ).add( password ),
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

    function doModal() {

      $( "#dialog-form" ).dialog( "open" );
    }

    function closeDlg() {

      $( "#dialog-form" ).dialog( "close" );
    }

    function resetForm() {

      $( "#name" ).val("");
      $( "#password" ).val("");
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

          var bValid = true;
          allFields.removeClass( "ui-state-error" );
 
          bValid = bValid && checkLength( name, "username", 3, 16 );
          bValid = bValid && checkLength( password, "password", 5, 16 );
 
          //bValid = bValid && checkRegexp( name, /^[a-z]([0-9a-z_.])+$/i, "Username may consist of a-z, 0-9, underscores, begin with a letter." );
          //bValid = bValid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );
 
          if ( bValid ) {

            var userName = $( "#name" ).val(),
                passWord = $( "#password" ).val();
            
            var loginData = {userName: userName, passWord: passWord};

            authentication.authenticate(loginData);
          }
        }
       }
    });

    return {

      doModal: function() {          
          doModal();
      },
      closeDlg: function() {          
          closeDlg();
      },
      resetForm: function() {          
          resetForm();
      }
    };

}(jQuery));