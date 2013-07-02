/*
 * Donor Application
 *
 * Page layout scripts 
 *
 * Author: Jeff Rynhart
 * 
 * University of Denver, June 2013
 */

searchView = (function($) {

	var initPage,
		addEvents;

	initPage = function() {

		$(".content-window").css("height", "500px");

		$(".generic-label").text("Search Records");

		addEvents();
	};

	addEvents = function() {

		$("#search-form").validate({

	        errorClass: "invalid",
	        submitHandler: function() {
	            //submitSearch();
	            alert("submit search");
	        }
	    });
	};

	return {

		initPage: function() {	
			initPage();
		}
	};

}(jQuery));


browseDonorsView = (function($) {

	var initPage,
		getData,

		tableData;

	initPage = function() {

		$(".content-window").css("height", "645px");

		$(".generic-label").text("Donor Listing");

		$("#table-header").html("<thead> <th class='span2'><!--SPACE--></th> <th class='span4'>First Name</th> <th class='span4'>Last Name</th> <th><!--SPACE--></th> </thead>");

		$(".pre-scrollable").css("max-height", "390px");

		getData();
	};

	getData = function() {

		utils.requestAllDonorData();
	};

	setLayout = function(allDonorData) {

		$("#table-content").html(allDonorData);
	};

	return {

		initPage: function() {
			initPage();
		},
		setLayout: function(results) {
			setLayout(results);
		}
	};

}(jQuery));


addGiftView = (function($) {

	var initPage,
		loadDonor,
		addEvents;

	initPage = function() {

		$(".content-window").css("height", "590px");

		$(".generic-label").text("Add a Gift");

		$('#select_donor_button').attr('disabled', 'disabled');
		$('#gift_submit_button').attr('disabled', 'disabled');

		$('#display-donor-section').hide();
		$("#new_donor_button").css("visibility", "hidden");

		addEvents();
	};

	loadDonor = function(donorID) {

		alert("load donor" + donorID);
	};

	addEvents = function() {

		$('#donor_select_box').focus(function() {


		});

		$('#donor_select_box').focusout(function() {

			
		});
	};

	return {

		initPage: function() {	
			initPage();
		},
		loadDonor: function(donorID) {	
			loadDonor(donorID);
		}
	};

}(jQuery))


giftDetailsView = (function($) {

	var initPage;

	initPage = function() {

		$(".content-window").css("height", "580px");

		$(".generic-label").text("Gift Details");

		$('#select-donor-section').hide();
		$('#gift_submit_button').hide();

		$('#gift_date_box').attr('placeholder', '');
	};

	return {

		initPage: function() {	
			initPage();
		}
	};

}(jQuery));


addDonorInfoView = (function($) {

	var initPage,
		getTitleData,
		createTitleDropdown;

	initPage = function() {

		$(".content-window").css("height", "740px");

		$(".generic-label").text("Add New Donor Info");

		//getTitleData();
		var testData;
		testData = utils.getTitleArray();
		// alert(testData);
	};

	getTitleData = function() {

		requestObj = {

			type: "POST", 
			url: _searchUrl + '/getTitleList',
			dataType: "json",
			cache: true,
			success: function(result) {
				createTitleDropdown(result);
			},
			error: function ( textStatus, errorThrown ) {
                alert( errorThrown );
            }
		};
		utils.doAjax(requestObj);
	};

	createTitleDropdown = function(tableData) {

		alert(tableData);
	};

	return {

		initPage: function() {	
			initPage();
		}
	};

}(jQuery));


