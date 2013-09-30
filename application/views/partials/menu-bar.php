<!doctype html>
<html lang="en">
<head>
<title>| 5</title>

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

            <li class="navbar-item" id="logout-link" style="border: none;"><a title="Logout" onclick="authentication.logout();">Logout</a></li> <!-- call controller -->

        </ul>
        <!--/section-->
    </div>

</body>
</html>