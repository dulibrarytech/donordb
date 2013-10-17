<?php
	// if(!isset($nameString))
	// 	$nameString = null;
?>

<head>

	<!-- [if lt IE 7]> <html class="ie6"> <![endif] -->
	<!-- [if IE 7]> <html class="ie7"> <![endif] -->
	<!-- [if IE 8]> <html class="ie8"> <![endif] -->
	<!-- [if gt IE 8]><! -->

	<?php $this->load->view("partials/head-partial.php"); ?>

	<link rel="stylesheet" href="<?php echo base_url();?>assets/css/login-form.css">

	<meta name="page" content="gift-view">

	<!-- Positioning -->   
	<style>
		#gift_description_box		{ width: 500px; height: 75px; }
		#gift_details_box			{ width: 500px; height: 75px; }

		#select_date_elts			{ margin-right: 30px; }
		#gift_date_label			{ margin-right: 42px; }

		#gift_submit_button			{ margin-left: -7px; }

		#important_gift_check		{ margin-bottom: 10px; }
		#important-checkbox			{ margin-top: 40px; margin-right: 30px; }
		#important_label			{ margin-right: 50px; margin-top: -20px; }
		#skip-letter-checkbox		{ margin-top: 40px; margin-right: 30px; }
		#skip_letter_label			{ margin-right: 50px; margin-top: -20px; }

		#change_date_elts			{ margin-right: 60px; }
		#change_date_label			{ margin-right: 22px; }

		#gift_description_label		{ margin-top: 15px; }
		#gift_details_label			{ margin-top: 15px; }

		#dropdown-box-section		{ margin-left: 42px; width: 150px; }
		#dropdown-box 				{ width: 120px; }

		#back_button				{ margin-left: 0px; }
		#add_info_message			{ padding-top: 15px; }

		#letter-status 				{ margin-right: 30px; }
		#username-label				{ margin-right: 20px; }

		.lower_controls				{ margin-top: -7px; }
		#gift_form_table			{ width: 100%; }
	</style>

</head>


<header id="header-bar">	
	<?php $this->load->view("partials/header-bar.php"); ?>
</header>


<body>

	<!-- Title Box text -->
	<div id="app-title" class="container">
		<div class="container">
			<div id="app-title-box">
				|5
			</div>
		</div>
	</div>

	<!-- Main Content Window -->
	<div class="container content-window" id="edit-content-window">

		<!-- Menu Bar -->
		<?php $this->load->view("partials/menu-bar.php"); ?>

		<table style="width: 100%"><tr>
			<td>
				<div class="container generic-label" id="page-label"></div>	     
			</td>
			<td align="right" style="text-align: right;">
				<div class="small-label" id="username-label"></div>
			</td>
		</tr></table>

		<!-- Add Gift form -->
		<form id="add-gift-form" method="post">

			<div class="well" id="display-donor-section">
				<table style="width: 100%"><tr>
					<td>
						<label class="form-label-text left-edge-field" id="donor-name-label"></label>
					</td>
					<td align="right" style="text-align: right;">
						<div class="generic-text" id="letter-status"></div>
					</td>
				</tr>
				<tr>
					<td>
						<label class="left-edge-field" id="donor-address-label"></label>
					</td>
				</tr></table>
			</div>

			<div class="well" id="add-gift-section">
				<table id="gift_form_table">
					<tr><td>
						<label for="gift_quantity_box" class="form-label-text left-edge-field" id="gift_quantity_label">Quantity:</label>  
						<input type="text" class="input-small left-edge-field" id="gift_quantity_box" placeholder="#" name="giftQuantity" />
					</td>
					<td align="right">
						<div id="change_date_elts">
							<label for="edit-date-box" class="form-label-text" id="change_date_label">Edit Date:</label>  
							<input type="text" class="input-small" id="edit-date-box" name="giftDateEdit" />
						</div>
					</td>
					<td align="right">
						<div id="select_date_elts">
							<label for="gift-date-box" class="form-label-text" id="gift_date_label">Select Gift:</label>  
							<input type="text" class="input-small" id="gift-date-box" name="giftDate" />

							<div id="dropdown-box-section"></div>
						</div>
					</td></tr>
					<tr><td colspan="2">
						<label for="gift_description_box" class="form-label-text left-edge-field" id="gift_description_label">Description:</label> 
						<textarea class="textarea left-edge-field" id="gift_description_box" name="giftDescription" cols="70" rows="50"></textarea>
					</td></tr>
					<tr>
						<td  rowspan="2" colspan="2">
							<label for="gift_destails_box" class="form-label-text left-edge-field" id="gift_details_label">Details:</label> 
							<textarea class="textarea left-edge-field" id="gift_details_box" name="giftDetails" cols="70" rows="50"></textarea>
						</td>
						<td align="right">
							<div id="skip_letter_check">
								<input type='hidden' name='skipLetterFlag' value="0" />
								<input type="checkbox" name="skipLetterFlag" class="checkbox" id="skip-letter-checkbox" value="1"></input>
								<label for="important-checkbox" class="form-label-text left-edge-field" id="skip_letter_label">Bypass Letter Request</label> 
							</div>
						</td>
					</tr>
					<tr>
						<td align="right">
							<div id="important_gift_check">
								<input type='hidden' name='importantFlag' value="0" />
								<input type="checkbox" name="importantFlag" class="checkbox" id="important-checkbox" value="1"></input>
								<label for="important-checkbox" class="form-label-text left-edge-field" id="important_label">Hand-Typed Letter</label> 
							</div>
						</td>
					</tr>
				</table>
			</div>

			<!-- This table creates a row with the submit button and an 'adding donor info' status message to the right of the button-->
			<table class="table lower_controls">
				<tr>
					<td class="span1"><button type="submit" class="btn-grey button-table-item" id="gift_submit_button"></button></td>
					<td class="span1"><button type="button" class="btn-grey" id="back_button">Back</button></td>
					<td class="span10"><div id="add_info_message"></div></td>
				</tr>
			</table>

		</form>  

	</div>

	<div class="copyright-text">
		<p>University of Denver, University Libraries &copy2013</p>
	</div>

</body>


<footer id="footer-bar">

	<!--?php $this->load->view("partials/footer-bar.php"); ?-->

	<!--Load javascript functions-->
	<?php $this->load->view("partials/javascript-partial.php"); ?>

	<script>//authentication.validateSession();</script>

	<!-- Run page loader for requested page (set in CI controller) -->
	<?php echo $pageLoader; ?>

</footer>






