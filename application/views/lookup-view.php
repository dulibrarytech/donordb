<?php

?>


<head>

	

	<link rel="stylesheet" type="text/css" href="<?php echo base_url();?>assets/css/ootstrap.min.css" />
	<link rel="stylesheet" type="text/css" href="<?php echo base_url();?>assets/css/main.css" />

	<link rel="stylesheet" href="<?php echo base_url();?>assets/css/jquery-ui.css" />
	<link rel="stylesheet" href="<?php echo base_url();?>assets/css/login-form.css">

	<style>
		#lname_label 		{ margin-left: 25px; }
		#lname_input_box 	{ margin-top:9px; margin-left: 25px; }
		#submit_lname 		{ margin-top:2px; margin-left: 20px; }
		#date_label 		{ margin-left: 25px; padding-bottom: 9px }
		#fromDate			{ margin-left: 25px; }
		#toDate				{ margin-left: 85px; }
		#submit_date		{ margin-left: 20px; margin-bottom: 9px; }
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
	<div class="container content-window">

		<?php $this->load->view("partials/menu-bar.php"); ?>

		<!-- Large menu buttons -->


		<div class="container generic-label" id="page-label"></div>	

		<!-- Last name search form -->
		<form id="lname_input" class="well" method="post">  <!-- action? -->
			<label class="form-label-text" id="lname_label">Search by Last Name:</label>  

			<input type="text" class="input-xlarge" id="lname_input_box" placeholder="Search all donors" name="lastName">  

		    <button type="submit" class="btn" id="submit_lname">Submit</button>  
		</form>  

		<!-- Date span search form -->
		<form id="date_input" class="well" method="post">  <!-- action? -->
			<label class="form-label-text" id="date_label">Display Results in Date Range:</label>

			<input type="text" class="input-small" id="fromDate" name="fromDate" placeholder="From"/>

			<input type="text" class="input-small" id="toDate" name="toDate" placeholder="To"/>

			<button type="submit" class="btn" id="submit_date">Submit</button> 
		</form>

		<!-- Table section -->
		<div id="table-section">

			<!-- Stationary table header -->
			<table class="table table-bordered" id="">
				<thead> <th class="span2"><!--SPACE--></th> <th class="span4">First Name</th> <th class="span4">Last Name</th> <th><!--SPACE--></th> </thead>
			</table>

			<!-- Table content section -->
			<div class="scrollable">
				<div class="container" id="">

		 			<div id="table-content"></div>

				</div>
			</div>

		</div>

	</div>

	<div class="copyright-text">
		<p>University of Denver, Anderson Academic Commons &copy2013</p>
	</div>

	<!-- Popup login dialog -->
	<div id="dialog-form" title="Login">
		<form>
			<fieldset>
			    <label for="name">Username</label>
			    <input type="text" name="name" id="name" class="text ui-widget-content ui-corner-all" />
			    <label for="password">Password</label>
			    <input type="password" name="password" id="password" class="text ui-widget-content ui-corner-all" />
			</fieldset>
		</form>
	</div>

</body>


<footer id="footer-bar">
	<?php $this->load->view("partials/footer-bar.php"); ?>

	<!--Load javascript functions-->
	<?php $this->load->view("partials/javascript-partial.php"); ?>
	
	<script>
		searchView.initPage();
		authentication.validateSession();
	</script>
</footer>






