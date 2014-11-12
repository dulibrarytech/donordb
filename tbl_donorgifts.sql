-- phpMyAdmin SQL Dump
-- version 3.4.10.1deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 11, 2014 at 07:38 PM
-- Server version: 5.5.40
-- PHP Version: 5.3.10-1ubuntu3.15

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `donordb`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_donorgifts`
--

CREATE TABLE IF NOT EXISTS `tbl_donorgifts` (
  `giftsID` int(10) NOT NULL AUTO_INCREMENT,
  `donorID` int(10) NOT NULL,
  `Cdate` datetime DEFAULT NULL,
  `dateOfGift` datetime DEFAULT NULL,
  `numberOfGifts` int(10) DEFAULT NULL,
  `important` tinyint(1) NOT NULL DEFAULT '0',
  `letter` tinyint(1) NOT NULL DEFAULT '0',
  `bypassLetter` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`giftsID`),
  KEY `FK_tbl_donorGifts_tbl_donorInfo` (`donorID`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4052 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
