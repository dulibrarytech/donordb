<?php

?>

<head>

	<!--CSS-->
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
			Browse Donors
		</div>

		<table class="table table-bordered" id="title-list-table-header-section">
			<thead> <th class="span2"><!--SPACE--></th> <th class="span4">First Name</th> <th class="span4">Last Name</th> <th><!--SPACE--></th> </thead>
		</table>

		<div class="scrollable">
			<div class="container" id="browse-donors-table-section">

	 			<div id="table-content"></div>

			</div>
		</div>

		<p class="copyright-text" style="margin-top: 30px;">University of Denver, Anderson Academic Commons &copy2013</p>

	</div>

</body>


<footer id="footer-bar">
	<?php $this->load->view("partials/footer-bar.php"); ?>
</footer>


<?php $this->load->view("partials/javascript-partial.php"); ?>

<script>
	loadAllDonors();
</script>




