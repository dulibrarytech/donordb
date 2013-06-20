<?php

?>


<head>

	<link rel="stylesheet" type="text/css" href="bootstrap.min.css" />
	<link rel="stylesheet" type="text/css" href="main.css" />

	<style>
		#lname_label { margin-left: 25px; }

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

		<div class="container generic-label" id="page-label"></div>	

		<form id="last-name-input" class="well" method="post">  
			<label class="form-label-text" id="lname_label">Search by Last Name:</label>  

				<input type="text"  style="margin-top:9px; margin-left: 25px;" placeholder="Last Name" name="lastName">  

		    	<button type="submit" class="btn" id="submit_lname" style="margin-top:2px; margin-left: 20px;">Submit</button>  
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

	<script>
		searchView.initPage();	
	</script>
</footer>






