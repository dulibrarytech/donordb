<?php

?>

<head>

	<!-- -->
	<link rel="stylesheet" type="text/css" href="<?php echo base_url();?>assets/css/bootstrap.css" />
	<link rel="stylesheet" type="text/css" href="<?php echo base_url();?>assets/css/main.css" />

	<style>

		/* last name input */
		#input-box {

			margin-top: 10px;
			height: 30px;
			width: 280px;
			margin-left: 25px;
		}

	</style>

</head>


<header id="header-bar">	
	<?php $this->load->view("partials/header-bar.php"); ?>
</header>


<body>

	postwith();
	<div id="app-title" class="container">
		<div class="container">
			<div id="app-title-box">
				<label class="du-label-text">Donor Application</label>
			</div>
		</div>
	</div>

	<!-- Main Content Window -->
	<div class="container content-window">

		<?php $this->load->view("partials/menu-bar.php"); ?>

		<div class="container generic-label">
			Search Donors
		</div>

		<form id="last-name-input" class="well">  
			<label class="form-label-text" style="margin-left: 25px">Search by Last Name:</label>  
				<input type="text" id="input-box" class="form-elements span3" placeholder="Last Name">  

		    	<button type="submit" class="btn" id="submit_lname" style="margin-left: 20px;">Submit</button>  
		</form>  

		<form id="date-input" class="well" action="<?php echo site_url();?>/search/dateSearch" method="post">  
			<label class="form-label-text" style="margin-left: 25px; padding-bottom: 9px">Search by Date:</label>
				<input type="text" id="fromDate" name="fromDate" style="margin-left: 25px; width: 100px; height: 30px;" placeholder="From"/>

				<input type="text" id="toDate" name="toDate" style="margin-left: 76px; width: 100px; height: 30px;" placeholder="To"/>

				<button type="submit" class="btn" id="submit_date" style="margin-left: 20px; margin-bottom: 9px;">Submit</button> 
		</form>

		<p class="copyright-text" style="margin-top: 5px;">University of Denver, Anderson Academic Commons &copy2013</p>

	</div>

	<!--div id="footer-bar"-->	
		<!--?php $this->load->view("partials/footer-bar.php"); ?-->
	<!--/div-->

</body>


<footer id="footer-bar">
	<?php $this->load->view("partials/footer-bar.php"); ?>
</footer>


<?php $this->load->view("partials/javascript-partial.php"); ?>



