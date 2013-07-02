<?php

?>


<head>

	<link rel="stylesheet" type="text/css" href="<?php echo base_url();?>assets/css/ootstrap.min.css" />
	<link rel="stylesheet" type="text/css" href="<?php echo base_url();?>assets/css/main.css" />

	<!-- Positioning -->
	<style>
		#add_info_button 		{ margin-left: 20px; margin-top: 0px; }
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

		<form class="well donor-info-form" id="upper_well" action="" method="post">  

			<table class="table">

				<tr>
					<td>
						<label class="form-label-text">Title:</label>  
						
					</td>
				
					<td>
						<label class="form-label-text">First Name:</label> 
						<input type="text" id="" class="inout_form-default" placeholder="" name="fName">  
					</td>

					<td>
						<label class="form-label-text">Last Name:</label>
						<input type="text" id="" class="inout_form-default" placeholder="" name="lName">  
					</td>
				</tr>

				<tr>
					<td>
						<label class="form-label-text">Organization:</label>
						<input type="text" id="" class="inout_form-default" name="org">  
					</td>
					<td>
						<label class="form-label-text">Address 1:</label>
						<input type="text" id="" class="inout_form-default" name="addr1">  
					</td>

					<td>
						<label class="form-label-text">Address 2:</label>
						<input type="text" id="" class="inout_form-default" name="addr2">  
					</td>
				</tr>

				<tr>
					<td>
						<label class="form-label-text">City:</label>
						<input type="text" id="" class="inout_form-default" style="" name="city">  
					</td>

					<td>
						<label class="form-label-text">State:</label>
						<input type="text" class="input-small" style="" name="state">  
					</td>

					<td>
						<label class="form-label-text">Zip:</label>
						<input type="text" class="input-small" style="" name="zip">  
					</td>
				</tr>

				<tr>
					<td>
						<label class="form-label-text">Phone 1:</label>
						<input type="text" id="" class="inout_form-default" style="" name="phone1">  
					</td>

					<td>
						<label class="form-label-text">Phone 2:</label>
						<input type="text" id="" class="inout_form-default" style="" name="phone2">  
					</td>

					<td>
						<label class="form-label-text">Email:</label>
						<input type="text" id="" class="inout_form-default" style="" name="email">  
					</td>
				</tr>

			</table>
		    	
		</form> 

		<form class="well donor-info-form" id="lower_well" action="" method="post"> 
			<table class="table">

				<tr>
					<td class="span7" rowspan="2">
						<label class="form-label-text">Gift Description:</label>
						<textarea class="textarea" id="description_area" name="giftdescription"></textarea>
					</td>
					<td class="span2">
						<!-- Spacer -->
					</td>
					<td class="span3">
						<label class="form-label-text">Gift Date:</label>  
						<input type="text" class="input-small" id="gift_date_box" placeholder="" name="giftDate"> 


					</td>
				
					<td class="span3">
						<label class="form-label-text" id="gift_quantity_label">Gift Quantity:</label> 
						<input type="text" class="input-small" id="gift_quantity_box" placeholder="" name="giftQuantity">  
					</td>
				</tr>

				<tr>
					<td class="span2">
						<!-- Spacer -->
					</td>
					<td colspan="2">
						<input type="checkbox" name="addGiftCheckbox">&nbsp&nbspDo not add a gift at this time</input>
					</td>
				</tr>
			</table>
		</form>

		<button type="submit" class="btn-grey" id="add_info_button">Save</button>

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






