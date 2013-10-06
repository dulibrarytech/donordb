<?php
	// if(!isset($nameString))
	// 	$nameString = null;
?>

<head>

	<?php $this->load->view("partials/head-partial.php"); ?>

	<link rel="stylesheet" href="<?php echo base_url();?>assets/css/jquery-ui.css" />
	<link rel="stylesheet" href="<?php echo base_url();?>assets/css/login-form.css">

	<link rel="shortcut icon" href="<?php echo base_url();?>img/kwak_favicon.ico" />

	<meta name="page" content="gift-view">

	<!-- Positioning -->   
	<!-- TODO: Create 'left edge field' class to offset by 25px left margin? -->
	<style>
		#gift_description_box		{ width: 500px; height: 150px; }
		#gift_date_label			{ margin-left: 43px; }
		#gift-date-box				{ margin-left: 75px; }
		#gift_submit_button			{ margin-left: -7px; margin-top: 0px; width: 90px;}
		#edit_date_cell				{ vertical-align: bottom;  }
		#important-checkbox			{ margin-top: 12px; }
		#add_anon_info_button		{ margin-left: 88px; margin-bottom: 8px; }

		.change_date_elts			{ margin-left: 120px; }

		#dropdown-box-section		{ margin-left: 42px; width: 150px; }
		#dropdown-box 				{ width: 120px; }

		#lower_controls				{ background-color: #ffffff; width: 60%; padding: -10px; margin-top: -10px; }
		#add_info_message			{ padding-top: 15px; }

		#letter-status 				{ margin-right: 30px; }
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
				<div id="username-label"></div>
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
				</tr></table>
			</div>

			<div class="well" id="add-gift-section">
				<table>
					<tr><td class="span9">
						<label class="form-label-text left-edge-field" id="gift_quantity_label">Quantity:</label>  
						<input type="text" class="input-small left-edge-field" id="gift_quantity_box" placeholder="#" name="giftQuantity" />
					</td>
					<td id="important_gift_check">
						<input type='hidden' name='importantFlag' value="0">
						<input type="checkbox" name="importantFlag" class="checkbox" id="important-checkbox" value="1">Hand-Typed Letter</input>
					</td>
					<td>
						<label class="form-label-text" id="gift_date_label">Date of Gift:</label>  
						<input type="text" class="input-small" id="gift-date-box" name="giftDate" />

						<div id="dropdown-box-section"></div>
					</td></tr>
					<tr><td class="span9">
						<label class="form-label-text left-edge-field" id="gift_description_label">Description:</label> 
						<textarea class="textarea left-edge-field" id="gift_description_box" name="giftDescription" cols="70" rows="50"></textarea>
					</td>
					<td id="edit_date_cell" colspan="2">
						<label class="form-label-text change_date_elts" id="change_date_label">Change Date:</label>  
						<input type="text" class="input-small change_date_elts" id="edit-date-box" name="giftDateEdit" />

						<input type="button" class="btn" id="add_anon_info_button" value="Add info"/>
					</td>
				</table>
			</div>

			<!-- This table creates a row with the submit button and an 'adding donor info' status message to the right of the button-->
			<table class="table" id="lower_controls"><tr>
				<td class="span2"><button type="submit" class="btn-grey" id="gift_submit_button"></button></td>
				<td id="add_info_message"></td>
				<!--td class=""><input type="checkbox" id="add_gift_checkbox" name="addGiftCheckbox">&nbsp&nbspDo not add a gift at this time</input></td></tr-->
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






