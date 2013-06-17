<?php

	

?>

<head>

	<!-- Date Picker widget -->
  	<link rel="stylesheet" href="<?php echo base_url();?>assets/css/jquery-ui.css" />
  	<script src="<?php echo base_url();?>assets/js/jquery-1.9.1.js"></script>
  	<script src="<?php echo base_url();?>assets/js/jquery-ui.js"></script>
 	<!--link rel="stylesheet" href="/resources/demos/style.css" /-->
 	<script src="<?php echo base_url();?>assets/js/jquery.js"></script>

	<!-- -->
	<link rel="stylesheet" type="text/css" href="<?php echo base_url();?>assets/css/bootstrap.css" />
	<link rel="stylesheet" type="text/css" href="<?php echo base_url();?>assets/css/main.css" />

</head>

<header id="header-bar">	
	<?php $this->load->view("partials/header-bar.php"); ?>
</header>

<body>

	<div id="app-title" class="container">
		<div class="container">
			<div id="app-title-box">
				<label class="du-label-text">Donor Application</label>
			</div>
		</div>
	</div>

	<!-- Main Content Window -->
	<div class="container content-window" id="browse-donors-window">

		<?php $this->load->view("partials/menu-bar.php"); ?>

		<div class="container generic-label">
			Edit Donor Info
		</div>

		<!-- Bootstrap table? -->

		<form class="well" style="margin-top: -15px;" action="<?php echo site_url();?>/search/donorSearch" method="post">  

			<table class="table" id="form-table">

				<tr>
					<td>
						<label class="form-label-text" style="">Title:</label>  
						<input type="text" id="donor-input-box" class="form-elements span3" value="Mr." name="title">  
					</td>
				
					<td>
						<label class="form-label-text" style="">First Name:</label> 
						<input type="text" id="donor-input-box" class="form-elements span3" value="Magic" name="fName">  
					</td>

					<td>
						<label class="form-label-text" style="">Last Name:</label>
						<input type="text" id="donor-input-box" class="form-elements span3" value="Johnson" name="lName">  
					</td>
				</tr>

				<tr>
					<td>
						<label class="form-label-text">Address 1:</label>
						<input type="text" id="donor-input-box" class="form-elements span3" value="12345 Rodeo Dr" name="addr1">  
					</td>

					<td>
						<label class="form-label-text">Address 2:</label>
						<input type="text" id="donor-input-box" class="form-elements span3" value="The King Suite" name="addr2">  
					</td>
				</tr>

				<tr>
					<td>
						<label class="form-label-text" style="">City:</label>
						<input type="text" id="donor-input-box" class="form-elements span3" value="Beverly Hills" style="" name="city">  
					</td>

					<td>
						<label class="form-label-text" style="">State:</label>
						<input type="text" id="donor-input-box" class="form-elements span3" value="CA" style="" name="state">  
					</td>

					<td>
						<label class="form-label-text" style="">Zip:</label>
						<input type="text" id="donor-input-box" class="form-elements span3" value="90210" style="" name="zip">  
					</td>
				</tr>

				<tr>
					<td>
						<label class="form-label-text" style="">Phone:</label>
						<input type="text" id="donor-input-box" class="form-elements span3" value="213-123-2131" style="" name="phone">  
					</td>

					<td>
						<label class="form-label-text" style="">Email:</label>
						<input type="text" id="donor-input-box" class="form-elements span3" value="mrmagic@gmail.com" style="" name="email">  
					</td>
				</tr>

			</table>
		    	
		</form>  

		<form class="well" style="margin-top: -25px;" action="<?php echo site_url();?>/search/donorSearch" method="post">  

			<table class="table" id="form-table">

				<tr>
					<td>
						<label class="form-label-text" style="">Gift Description:</label>
						<input type="text" id="donor-input-box" class="form-elements span3" value="Basketball" style="" name="giftDesc">  
					</td>

					<td>
						<label class="form-label-text" style="">Number of Gifts:</label>
						<input type="text" id="donor-input-box" class="form-elements span3" value="2" style="" name="noOfGifts">  
					</td>

					<td>
						<label class="form-label-text" style="">Date of Gift:</label>
						<input type="text" id="donor-input-box" class="form-elements span3" value="9/9/2009" style="" name="giftDate">  
					</td>
				</tr>

			</table>

		</form>

		<button type="submit" class="btn-grey" id="update_info" style="margin-left: 10px;">Update</button> 

		<p class="copyright-text" style="margin-top: 34px;">University of Denver, Anderson Academic Commons &copy2013</p>

	</div>

</body>

<footer id="footer-bar">
	<?php $this->load->view("partials/footer-bar.php"); ?>
</footer>