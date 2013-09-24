-- phpMyAdmin SQL Dump
-- version 3.5.2.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 24, 2013 at 06:03 PM
-- Server version: 5.5.27
-- PHP Version: 5.4.7

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `donor`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_donorusers`
--

CREATE TABLE IF NOT EXISTS `tbl_donorusers` (
  `userID` int(3) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `roleID` int(3) NOT NULL,
  `firstname` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `id` (`userID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=8 ;

--
-- Dumping data for table `tbl_donorusers`
--

INSERT INTO `tbl_donorusers` (`userID`, `username`, `roleID`, `firstname`, `lastname`, `email`) VALUES
(1, 'lisa.deidrich', 2, 'Lisa', 'Deidrich', 'lisa.deidrich@du.edu'),
(2, 'merisa.bissinger', 1, 'Merisa', 'Bissinger', 'merisa.bissinger@du.edu'),
(3, 'andrea.howland', 3, 'Andrea', 'Howland', 'andrea.howland@du.edu'),
(4, 'jeff.rynhart', 2, 'Jeff', 'Rynhart', 'jeff.rynhart@du.edu'),
(5, 'acq', 1, 'Acquisitions', 'Test', 'dummy@email.com'),
(6, 'admin', 2, 'Admin', 'Test', 'jeff.rynhart@du.edu'),
(7, 'external', 3, 'External Relations', 'Test', 'JRynhart@comcast.net');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
