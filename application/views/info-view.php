<?php

?>


<head>

	<link rel="stylesheet" type="text/css" href="<?php echo base_url();?>assets/css/bootstrap.min.css" />
	<link rel="stylesheet" type="text/css" href="<?php echo base_url();?>assets/css/main.css" />

	<!-- Positioning -->
	<style>
		#add_info_button 		{ margin-left: -7px; margin-top: -10px; }
		#upper_well				{ padding-bottom: 0px; }
		#lower_well				{ padding-bottom: 0px; }
		#description_area		{ width: 455px; height: 75px;}
		#gift_quantity_label	{ margin-left: 20px; }
		#gift_quantity_box		{ margin-left: 20px; }
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
	<div class="container content-window">

		<!-- Menu Bar -->
		<?php $this->load->view("partials/menu-bar.php"); ?>

		<div class="container generic-label"></div>	

		<form id="donor-input-form" method="post">
			<div class="well donor-info-form-section" id="upper_well">  

				<table class="table">

					<tr>
						<td>
							<label class="form-label-text">Title:</label>  
							<div id="dropdown-box"></div>
						</td>
					
						<td>
							<label class="form-label-text">First Name:</label> 
							<input type="text" id="fname_input_box" class="input_form-default" name="fName"/>  
						</td>

						<td>
							<label class="form-label-text">Last Name:</label>
							<input type="text" id="lName_input_box" class="input_form-default" name="lName"/>  
						</td>
					</tr>

					<tr>
						<td>
							<label class="form-label-text">Organization:</label>
							<input type="text" id="org_input_box" class="input_form-default" name="org"/>  
						</td>
						<td>
							<label class="form-label-text">Address 1:</label>
							<input type="text" id="addr1_input_box" class="input_form-default" name="addr1"/>  
						</td>

						<td>
							<label class="form-label-text">Address 2:</label>
							<input type="text" id="addr2_input_box" class="input_form-default" name="addr2"/>  
						</td>
					</tr>

					<tr>
						<td>
							<label class="form-label-text">City:</label>
							<input type="text" id="city_input_box" class="input_form-default" name="city"/>  
						</td>

						<td>
							<label class="form-label-text">State:</label>
							<input type="text" id="state_input_box" class="input-small" name="state"/>  
						</td>

						<td>
							<label class="form-label-text">Zip:</label>
							<input type="text" id="zip_input_box" class="input-small" name="zip"/>  
						</td>
					</tr>

					<tr>
						<td>
							<label class="form-label-text">Country:</label>
							<input type="text" id="country_input_box" class="input_form-default" name="country" value="USA"/>  
						</td>

						<td>
							<label class="form-label-text">Phone:</label>
							<input type="text" id="phone_input_box" class="input_form-default" name="phone"/>  
						</td>

						<td>
							<label class="form-label-text">Email:</label>
							<input type="text" id="email_input_box" class="input_form-default" name="email"/>  
						</td>
					</tr>

				</table>
			    	
			</div> 

			<div class="well donor-info-form-section" id="lower_well"> 
				<table class="table">

					<tr>
						<td class="span7" rowspan="2">
							<label class="form-label-text">Gift Description:</label>
							<textarea class="textarea" id="description_area" name="giftDescription"></textarea>
						</td>
						<td class="span2">
							<!-- Spacer -->
						</td>
						<td class="span3">
							<label class="form-label-text">Gift Date:</label>  
							<input type="text" class="input-small" id="gift-date-box" name="giftDate"/> 


						</td>
					
						<td class="span3">
							<label class="form-label-text" id="gift_quantity_label">Gift Quantity:</label> 
							<input type="text" class="input-small" id="gift_quantity_box" name="giftQuantity"/>  
						</td>
					</tr>

					<tr>
						<td class="span2">
							<!-- Spacer -->
						</td>
						<td colspan="2">
							<input type="checkbox" id="add_gift_checkbox" name="addGiftCheckbox" value="checked">&nbsp&nbspDo not add a gift at this time</input>
						</td>
					</tr>
				</table>
			</div>

			<!-- This table creates a row with the submit button and an 'adding donor info' status message to the right of the button-->
			<table class="table" style="background-color: #ffffff; width: 40%;"><tr><td class="span1"><button type="submit" class="btn-grey" id="add_info_button">Save</button></td><td class="span4" id="add_info_message">Adding new donor info...</td></tr></table>
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






