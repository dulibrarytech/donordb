<!doctype html>
<html lang="en">
<head>
<title>Donor Database</title>

	<link rel="stylesheet" type="text/css" href="<?php echo base_url();?>assets/css/bootstrap.css" />
	<link rel="stylesheet" type="text/css" href="<?php echo base_url();?>assets/css/main.css" />

</head>

<body>

    <div class="container bannersNav" id="nav-bar">
        <!--section id="page-banners"-->
        <ul class="nav nav-tabs">
            <li class="navbar-item"><a class="active" title="Application Home" href="<?php echo base_url();?>index.php/search">Search</a></li>

            <li class="navbar-item"><a title="Browse Donors" href="<?php echo base_url();?>index.php/search/browseDonors">Browse Donors</a></li>

            <li class="navbar-item"><a title="" href="<?php echo base_url();?>index.php/edit/addDonorView">Add Donor Info</a></li>

            <li class="navbar-item"><a title="New Gift" href="<?php echo base_url();?>index.php/edit/addGiftView/1">Anonymous Gift</a></li>

            <li class="navbar-item" id="settings-link"><a title="Settings" href="#">Settings</a></li> <!-- call controller to  -->

            <li class="navbar-item" id="new-donations-link" style="border: none;" onclick="searchView.showNewDonationList();"><a title="New Donations" href="#">New Donations</a></li>

            <!---li class="navbar-item" style="border: none"><a title="Logout session" href="<?php //echo base_url();?>index.php/login/logout">Logout</a></li-->

        </ul>
        <!--/section-->
    </div>

</body>
</html>