<?php
	//print_r($CI =& get_instance());
?>


<head>

	<link rel="stylesheet" type="text/css" href="<?php echo base_url();?>assets/css/bootstrap.min.css" />
	<link rel="stylesheet" type="text/css" href="<?php echo base_url();?>assets/css/main.css" />

	<link rel="stylesheet" href="<?php echo base_url();?>assets/css/jquery-ui.css" />
	<link rel="stylesheet" href="<?php echo base_url();?>assets/css/login-form.css" />

	<link rel="shortcut icon" href="<?php echo base_url();?>img/kwak_favicon.ico" />

	<meta name="page" content="lookup-view">

	<!-- Positioning -->
	<style>
		#lname_label 			{ margin-left: 25px; }
		#lname_input_box 		{ margin-top:9px; margin-left: 25px; }
		#date_label 			{ margin-left: 25px; padding-bottom: 9px }
		#fromDate				{ margin-left: 25px; }
		#toDate					{ margin-left: 85px; }
		#search_submit			{ margin-left: 475px; margin-bottom: 9px; }
		#post-search-buttons	{ margin-left: 20px; margin-top: 30px; }
		#anon_check_label		{ margin-left: 320px; margin-top: 5px; }
		#anonymous-gift-check	{ margin-left: 530px; margin-top: -25px; }
		#add_info_message		{ margin-left: 650px; }
		#data-section-1			{ margin-left: 730px; }
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
	<div class="container content-window" id="home-window">

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

		<!-- Search Section -->
		<form id="search-form" method="post">

			<div class="well" id="search-form-name"> 
				<table><tr>
					<td>
						<label for="lname_input_box" class="form-label-text" id="lname_label">Last Name or Organization:</label>  
						<input type="text" class="input-xlarge" id="lname_input_box" placeholder="Leave blank to search all donors" name="searchTerm"/>   
					</td>
					<td>
						<label for"anonymous-gift-check" class="form-label-text" id="anon_check_label">Search Anonymous Records</label> 
						<input type="checkbox" class="checkbox" id="anonymous-gift-check" value="0" name="anonymousCheck"/>
					</td>
				</td></table>
			</div>

			<div class="well" id="search-form-date">
				<label for"fromDate toDate" class="form-label-text" id="date_label">Date Range:</label>

				<input type="text" class="input-small" id="fromDate" name="fromDate" placeholder="From"/>

				<input type="text" class="input-small" id="toDate" name="toDate" placeholder="To"/>

				<button type="submit" class="btn" id="search_submit">Submit</button> 
			</div>

		</form>

		<div id="add_info_message"></div>

		<div class="container generic-label" id="alert-section-label"></div>

		<!-- Results Table Section -->
		<div id="table-section">

			<!-- Stationary table header -->
			<div class="table table-bordered" id="table-header"></div>

			<!-- Table content section -->
			<div class="container pre-scrollable">
	 			<div id="table-content"></div>
			</div>

			<div id="data-section-1"></div>

			<div id="post-search-buttons">
				<button class="btn-grey" id="search_return">Return To Search</button>
				<button class="btn-grey" id="search_new">New Search</button>
			</div>

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
	
	<!--script>authentication.validateSession();</script-->

	<!-- Run page loader for requested page -->
	<?php echo $pageLoader; ?>
	
</footer>






