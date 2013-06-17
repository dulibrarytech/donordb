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
	<div class="container content-window" id="title-list-window">

		<?php $this->load->view("partials/menu-bar.php"); ?>

		<div class="container generic-label">
			Title Listing
		</div>

		<table class="table table-bordered" id="title-list-table-header-section">
			<thead> <th class="span3"><!--SPACE--></th> <th>Title</th> </thead>
		</table>

		<div class="scrollable">
			<div class="container" id="title-list-table-section">
			<table class="table table-striped table-bordered">

	 			<?=$resultsTable;?>

			</table>
			</div>
		</div>

		<button type="submit" class="btn-grey" id="add_title" style="margin-left: 20px; margin-top: 20px;">Add Title</button> 

		<p class="copyright-text" style="margin-top: 19px;">University of Denver, Anderson Academic Commons &copy2013</p>

	</div>

</body>

<footer id="footer-bar">
	<?php $this->load->view("partials/footer-bar.php"); ?>
</footer>
