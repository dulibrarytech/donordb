<?php

?>


<head>

	<?php $this->load->view("partials/head-partial.php"); ?>
	
	<link rel="stylesheet" href="<?php echo base_url();?>assets/css/jquery-ui.css" />

	<link rel="shortcut icon" href="<?php echo base_url();?>img/kwak_favicon.ico" />

	<meta name="page" content="info-view">

	<!-- Positioning -->
	<style>
		#add_info_button 			{ margin-left: -8px; margin-top: -10px; }
		/*#add_info_message			{ width: 200px; }*/
		#gen_letter_button			{ margin-left: 0px; margin-top: -10px; }
		#upper_well					{ padding-bottom: 0px; }
		#lower_well					{ padding-bottom: 0px; }
		#description_area			{ width: 455px; height: 75px;}
		#gift_quantity_label		{ margin-left: 5px; }
		#gift_quantity_box			{ margin-left: 5px; }

		#back_button				{ margin-top: -10px; }

		#edit-gift-button			{ margin-left: 18px; margin-top: 10px; }
		#edit-gift-button           { margin-left: 18px; margin-top: 10px; }
        #important-checkbox         { margin-left: 40px; margin-top:-5px; }
        #username-label				{ margin-right: 20px; }

       /* #add_info_message			{ margin-left: 50px; }*/
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
	<div class="container content-window">

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

		<form id="donor-input-form" method="post">
			<div class="well donor-info-form-section" id="upper_well">  

				<table class="table">

					<tr>
						<td>
							<label for="title-edit-box" class="form-label-text" id="title-label">Title:</label>  
							<div id="dropdown-box"></div>

							<input type="text" class="input-medium" id="title-edit-box" placeholder="Enter new title:" />
						</td>
					
						<td>
							<label for="fname_input_box" class="form-label-text">First Name:</label> 
							<input type="text" id="fname_input_box" class="input_form-default" name="fName"/>  
						</td>

						<td>
							<label for="lName_input_box" class="form-label-text">Last Name:</label>
							<input type="text" id="lName_input_box" class="input_form-default" name="lName"/>  
						</td>
					</tr>

					<tr>
						<td>
							<label for="org_input_box" class="form-label-text">Organization:</label>
							<input type="text" id="org_input_box" class="input_form-default" name="org"/>  
						</td>
						<td>
							<label for="addr1_input_box" class="form-label-text">Address 1:</label>
							<input type="text" id="addr1_input_box" class="input_form-default" name="addr1"/>  
						</td>

						<td>
							<label for="addr2_input_box" class="form-label-text">Address 2:</label>
							<input type="text" id="addr2_input_box" class="input_form-default" name="addr2"/>  
						</td>
					</tr>

					<tr>
						<td>
							<label for="city_input_box" class="form-label-text">City:</label>
							<input type="text" id="city_input_box" class="input_form-default" name="city"/>  
						</td>

						<td>
							<label for="state_input_box" class="form-label-text">State:</label>
							<input type="text" id="state_input_box" class="input-medium" name="state"/>  
						</td>

						<td>
							<label for="zip_input_box" class="form-label-text">Zip:</label>
							<input type="text" id="zip_input_box" class="input-small" name="zip"/>  
						</td>
					</tr>

					<tr>
						<td>
							<label for="country_input_box" class="form-label-text">Country:</label>
							<input type="text" id="country_input_box" class="input_form-default" name="country" value="USA"/>  
						</td>

						<td>
							<label for="phone_input_box" class="form-label-text">Phone:</label>
							<input type="text" id="phone_input_box" class="input_form-default" name="phone"/>  
						</td>

						<td>
							<label for="email_input_box" class="form-label-text">Email:</label>
							<input type="text" id="email_input_box" class="input_form-default" name="email"/>  
						</td>
					</tr>

				</table>
			    	
			</div> 

			<div class="well donor-info-form-section" id="lower_well"> 
				<table class="table">

					<tr>
						<td class="span7" rowspan="2">
							<label for="description_area" class="form-label-text">Gift Description:</label>
							<textarea class="textarea" id="description_area" name="giftDescription"></textarea>
						</td>
						<td class="span2">
							<!-- Spacer -->
						</td>
						<td class="span3">
							<label for="gift-date-box" class="form-label-text">Gift Date:</label>  
							<input type="text" class="input-small" id="gift-date-box" name="giftDate"/> 

							<div id="gift-date-box-section"></div>
						</td>
					
						<td class="span3">
							<label for="gift_quantity_box" class="form-label-text" id="gift_quantity_label" for="gift_quantity_box">Gift Quantity:</label> 
							<input type="text" class="input-small" id="gift_quantity_box" name="giftQuantity"/>  
						</td>
					</tr>

					<tr>	
						<td id="important_gift_check" colspan="2">
                                <div id="important-box-text">
                                    <input type='hidden' name='importantFlag' value="0"/>
                                    <input type="checkbox" name="importantFlag" id="important-checkbox" value="1">Hand-Typed Letter</input>
                                </div>
                            </td>
						<td>
							<button type="button" class="btn" id="edit-gift-button">Edit Gift</button>
						</td>
					</tr>
				</table>
			</div>

			<!-- This table creates a row with the submit button and an 'adding donor info' status message to the right of the button-->
			<table class="table lower_controls"><tr>
				<td class="span1"><button type="submit" class="btn-grey" id="add_info_button">Save</button></td>
				<td class="span1"><button type="button" class="btn-grey" id="back_button">Back</button></td>
				<td class="span1"><button type="button" class="btn-grey" id="gen_letter_button">Letter</button></td>
				<td class="span9"><div id="add_info_message"></div></td>
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






