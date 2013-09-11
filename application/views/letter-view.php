<?php
/*
 * Created on Apr 8, 2008
 *
 * by Evan Blount
 * edited by Jeff Rynhart Sept. 2013
 */
?>
	

<?php $giftDescription1 = $_POST['giftDescription1'];?>
<?php $dateOfGift = $_POST['dateOfGift'];?>
<?php $title = $_POST['title'];?>

<title>Letter to [firstname][lastname]></title>
<body>
<div style="height: 75px;">

<div style="float: right;">
<img src="<?php echo base_url();?>images/lheader.jpg" height = "85px" />
</div>
</div>
<div style = "height: 740px;">
<?=date("F d, Y");?><br/>
<br/>[title] [firstname][lastname]
<br/>[address1]

<?php
	if($donorInfo['Address2'] != " ")
	{
		echo "</br>";
		echo $donorInfo['Address2'];
	}
?>

<br/><?php echo $donorInfo['City'];?>, <?php echo $donorInfo['State'];?> <?php echo $donorInfo['PostalCode'];?>

<br/><br/>

Dear <?php echo $title?> <?php echo $donorInfo['LastName']?>,<br/><br/>

I would like to thank you for your generous donation to the Penrose Library.
Your gift of <?php echo $giftDescription1;?>, 
which we received on <?php echo date("F d, Y",strtotime($dateOfGift)); ?>, is much appreciated.
Penrose Library has not provided you with any payment, or services in exchange for your gift; 
we do, however, convey our sincere appreciation for contribution - it has enhanced the library's resources.
<br/><br/>
While academic departments in the University of Denver have support from parents and 
alumni, the Penrose Library relies on its friends.  We are pleased to count you among our 
friends, and we hope we can count on your friendship in future years.
<br/><br/>
Again, I thank you for your generous support of the University of Denver Penrose Library.
<br/><br/>
Sincerely,
<br/><br/>
<img src="<?php echo base_url();?>images/ns.jpg" height = "85px" /><br/>
Nancy Allen
<br/>
Dean and Director
</div>
<div style="padding-top: 10px;">
<img src="<?php echo base_url();?>images/lfooter.jpg" width = "400px"/>
</div>
</body>

<footer>	
	<!--Load javascript functions-->
	<?php $this->load->view("partials/javascript-partial.php"); ?>

	<!--script>authentication.validateSession();</script-->

	<!-- Run page loader for requested page -->
	<?php echo $pageLoader; ?>
</footer>