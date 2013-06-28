<?php
	
?>

<head>

	<link rel="stylesheet" type="text/css" href="<?php echo base_url();?>assets/css/ootstrap.min.css" />
	<link rel="stylesheet" type="text/css" href="<?php echo base_url();?>assets/css/main.css" />

	<link rel="stylesheet" href="<?php echo base_url();?>assets/css/jquery-ui.css" />
	<link rel="stylesheet" href="<?php echo base_url();?>assets/css/login-form.css">

	<!-- Positioning -->   
	<!-- TODO: Create 'left edge field' class to offset by 25px left margin? -->
	<style>
		#select_donor_button		{ margin-left: 20px; margin-top: 15px; }
		#gift_add_donor				{ margin-left: 85px; margin-top: 15px; }
		#gift_description_box		{ width: 500px; height: 150px; }
		#gift_date_label			{ margin-left: 43px; }
		#gift_date_box				{ margin-left: 43px; }
		#gift_submit_button			{ margin-left: 45px; margin-top: 140px; width: 90px;}
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
				Donor Application
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
				<label class="form-label-text left-edge-field" id="donor_name_label">Donor Name:</label>  
				<input type="text" class="input-xlarge left-edge-field" id="donor_name_box" placeholder="Last name" name="selectName"> 
			</div>

			<div class="well" id="select-donor-section">
				<table><tr>
					<td>
						<label class="form-label-text left-edge-field" id="donor_select_label">Enter Donor Name:</label>  
						<input type="text" class="input-xlarge left-edge-field" id="donor_select_box" placeholder="Last name" name="selectName"> 
					</td>
					<td class="span4">
						<button type="submit" class="btn" id="select_donor_button">Select Donor</button>
					</td>
					<td class="span3">
						<button type="button" class="btn" id="gift_add_donor">Add New Donor Info</button>
					</td>
				</table></tr>
			</div>

			<div class="well" id="add-gift-section">
				<table>
					<tr><td class="span9">
						<label class="form-label-text left-edge-field" id="gift_quantity_label">Quantity:</label>  
						<input type="text" class="input-small left-edge-field" id="gift_quantity_box" placeholder="#" name="giftQuantity">
					</td>
					<td>
						<label class="form-label-text" id="gift_date_label">Date of Gift:</label>  
						<input type="text" class="input-small" id="gift_date_box" placeholder="Select date" name="giftDate">
					</td></tr>
					<tr><td class="span9">
						<label class="form-label-text left-edge-field" id="gift_description_label">Description:</label> 
						<textarea class="textarea left-edge-field" id="gift_description_box" name="giftDescription" cols="70" rows="50"></textarea>
					</td>
					<td>
						<button type="submit" class="btn" id="gift_submit_button">Add Gift</button>
					</td></tr>
				</table>
			</div>

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






