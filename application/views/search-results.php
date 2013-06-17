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
	<div class="container content-window results-window">

		<?php $this->load->view("partials/menu-bar.php"); ?>

		<div class="container search-type-label">
			<?=$searchType;?>
		</div>

		<!--div class="container search-results-header">
			<?=$resultsTableHeader;?>
		</div-->

		<div class="scrollable">
			<div class="container" id="search-results-table-section">
			<table class="table table-striped table-bordered" id="search-results-table">

	 			<?=$resultsTable;?>

			</table>
			</div>
		</div>

		<p class="copyright-text" style="margin-top: 20px;">University of Denver, Anderson Academic Commons &copy2013</p>

	</div>

</body>

<footer id="footer-bar">
	<?php $this->load->view("partials/footer-bar.php"); ?>
</footer>


