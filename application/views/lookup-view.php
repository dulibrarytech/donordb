<?php

?>


<head>

	

	<link rel="stylesheet" type="text/css" href="<?php echo base_url();?>assets/css/bootstrap.min.css" />
	<link rel="stylesheet" type="text/css" href="<?php echo base_url();?>assets/css/main.css" />

	<link rel="stylesheet" href="<?php echo base_url();?>assets/css/jquery-ui.css" />
	<link rel="stylesheet" href="<?php echo base_url();?>assets/css/login-form.css">

	<!-- Positioning -->
	<style>
		#lname_label 		{ margin-left: 25px; }
		#lname_input_box 	{ margin-top:9px; margin-left: 25px; }
		#date_label 		{ margin-left: 25px; padding-bottom: 9px }
		#fromDate			{ margin-left: 25px; }
		#toDate				{ margin-left: 85px; }
		#search_submit		{ margin-left: 475px; margin-bottom: 9px; }
		#post-search-buttons{ margin-left: 20px; }
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

		<!-- Search Section -->
		<form id="search-form" method="post">

			<div class="well" id="search-form-name">  
				<label class="form-label-text" id="lname_label">Last Name or Organization:</label>  

				<input type="text" class="input-xlarge" id="lname_input_box" placeholder="Leave blank to search all donors" name="searchTerm">  
			</div>

			<div class="well" id="search-form-date">
				<label class="form-label-text" id="date_label">Date Range:</label>

				<input type="text" class="input-small" id="fromDate" name="fromDate" placeholder="From"/>

				<input type="text" class="input-small" id="toDate" name="toDate" placeholder="To"/>

				<button type="submit" class="btn" id="search_submit">Submit</button> 
			</div>

		</form>

		<!-- Results Table Section -->
		<div id="table-section">
			<!-- Stationary table header -->
			<div class="table table-bordered" id="table-header"></div>

			<!-- Table content section -->
			<div class="container pre-scrollable">
	 			<div id="table-content"></div>
			</div>

		</div>

		<div id="post-search-buttons">
			<button class="btn-grey" id="search_return">Return To Search</button>
			<button class="btn-grey" id="search_new">New Search</button>
		</div>

	</div>

	<div class="copyright-text">
		<p>University of Denver, University Libraries &copy2013</p>
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
	
	<script>//authentication.validateSession();</script>

	<!-- Run page loader for requested page (set in CI controller) -->
	<?php echo $pageLoader; ?>
	
</footer>






