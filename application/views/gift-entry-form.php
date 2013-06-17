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
	<div class="container content-window" id="gift-entry-window">

		<?php $this->load->view("partials/menu-bar.php"); ?>

		<div class="container generic-label">
			Edit Donor Info
		</div>

		<!-- Bootstrap table? -->

		<form class="well" style="margin-top: -15px;" action="" method=""> 

			<div id="gift-entry-donor-label">
				[Donor Name]
			</div>

			<table class="table" id="form-table">

				<tr>
					<td class="span6">
						<label class="form-label-text" style="">Date of Gift:</label>
						<input type="text" id="donor-input-box" class="form-elements span3" name="giftDate">  
					</td>

					<td class="span6">
						<label class="form-label-text" style="">Quantity:</label>
						<input type="text" id="donor-input-box" class="form-elements span3" name="giftDate">  
					</td>
				</tr>

				<tr>
					<td class="span12">
						<label class="form-label-text" style="">Description:</label>
						<input type="text" id="donor-input-box-description" class="form-elements span12" name="giftDate">  
					</td>
				</tr>

			</table>

		</form>

		<button type="submit" class="btn-grey" id="enter_gift" style="margin-left: 10px;">Enter</button> 

		<p class="copyright-text" style="margin-top: 10px;">University of Denver, Anderson Academic Commons &copy2013</p>

	</div>

</body>

<footer id="footer-bar">
	<?php $this->load->view("partials/footer-bar.php"); ?>
</footer>