/*
 * Donor Application
 *
 * paths
 *
 * Author: 
 * 
 * University of Denver, June 2013
 */

var pathArray = window.location.href.split( '/' );
var baseUrl = "";
if(pathArray[2] == "localhost") {

	baseUrl     = "http://" + document.domain + "/I5App/";
}
else {

	baseUrl     = "https://" + document.domain + "/I5App/";
}

var _editUrl   			= baseUrl + "index.php/edit";
var _searchUrl  		= baseUrl + "index.php/search";
var _loginUrl			= baseUrl + "index.php/login";
var _logoutUrl  		= baseUrl + "index.php/login/logout";
var _statsUrl   		= baseUrl + "index.php/search/statisticsView";
var _statsSearchUrl  	= baseUrl + "index.php/search/statisticsSearch";

var EDIT_VIEW	= baseUrl + "index.php/views/edit-view.php";

var _serverErrorView = baseUrl + "html/server_error.html";


