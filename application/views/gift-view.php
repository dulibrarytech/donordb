<?php
	// if(!isset($nameString))
	// 	$nameString = null;
?>

<head>

	<link rel="stylesheet" type="text/css" href="<?php echo base_url();?>assets/css/bootstrap.min.css" />
	<link rel="stylesheet" type="text/css" href="<?php echo base_url();?>assets/css/main.css" />

	<link rel="stylesheet" href="<?php echo base_url();?>assets/css/jquery-ui.css" />
	<link rel="stylesheet" href="<?php echo base_url();?>assets/css/login-form.css">

	<!-- Positioning -->   
	<!-- TODO: Create 'left edge field' class to offset by 25px left margin? -->
	<style>
		#select_donor_button		{ margin-left: 5px; margin-top: 15px; /*width: 120px;*/ }
		#anon_donation_button		{ margin-left: 147px; margin-top: 15px; }
		#new_donor_button			{ margin-left: -10px; margin-top: 15px; }
		#gift_description_box		{ width: 500px; height: 150px; }
		#gift_date_label			{ margin-left: 43px; }
		#gift-date-box				{ margin-left: 43px; }
		#gift_submit_button			{ margin-left: 22px; margin-top: 0px; width: 90px;}
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
				Acquisitions Donations
			</div>
		</div>
	</div>

	<!-- Main Content Window -->
	<div class="container content-window" id="edit-content-window">

		<!-- Menu Bar -->
		<?php $this->load->view("partials/menu-bar.php"); ?>

		<div class="container generic-label"></div>

		<!-- Add Gift form -->
		<form id="add-gift-form" method="post">

			<div class="well" id="display-donor-section">
				<label class="form-label-text left-edge-field" id="donor-name-label"></label>   
			</div>

			<div class="well" id="select-donor-section">
				<table><tr>
					<td>
						<label class="form-label-text left-edge-field" id="donor_select_label">Existing Donor:</label>  
						<input type="text" class="input-xlarge left-edge-field" id="donor_select_box" placeholder="Name or Organization" name="selectName" /> 
					</td>
					<td class="span2">
						<button type="submit" class="btn" id="select_donor_button">Lookup</button>
					</td>
					<td class="span3">
						<button type="button" class="btn" id="new_donor_button">New Donor</button>
					</td>
					<td class="">
						<button type="button" class="btn" id="anon_donation_button">Anonymous Donation</button>
					</td>
				</table></tr>
			</div>

			<div class="well" id="add-gift-section">
				<table>
					<tr><td class="span9">
						<label class="form-label-text left-edge-field" id="gift_quantity_label">Quantity:</label>  
						<input type="text" class="input-small left-edge-field" id="gift_quantity_box" placeholder="#" name="giftQuantity" />
					</td>
					<td>
						<label class="form-label-text" id="gift_date_label">Date of Gift:</label>  
						<input type="text" class="input-small" id="gift-date-box" value="<?php echo $date ?>" name="giftDate" />
					</td></tr>
					<tr><td class="span9">
						<label class="form-label-text left-edge-field" id="gift_description_label">Description:</label> 
						<textarea class="textarea left-edge-field" id="gift_description_box" name="giftDescription" cols="70" rows="50"></textarea>
					</td>
				</table>
			</div>

			<button type="submit" class="btn-grey" id="gift_submit_button">Add Gift</button>

		</form>  

	</div>

	<div class="copyright-text">
		<p>University of Denver, Anderson Academic Commons &copy2013</p>
	</div>

</body>


<footer id="footer-bar">

	<?php $this->load->view("partials/footer-bar.php"); ?>

	<!--Load javascript functions-->
	<?php $this->load->view("partials/javascript-partial.php"); ?>

	<script>//authentication.validateSession();</script>

	<!-- Run page loader for requested page (set in CI controller) -->
	<?php echo $pageLoader; ?>

</footer>






