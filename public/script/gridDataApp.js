"use strict";

var modules = [ 
		"gridDataApp.controllers", 
		"gridDataApp.factories", 
		"gridDataApp.services", 
		"gridDataApp.directives"];
		
var ngModules = ['ui.router'];

var allModules = modules.concat( ngModules );

var gridDataApp = angular.module( "gridDataApp", allModules );

gridDataApp.config( function( $stateProvider, $urlRouterProvider ) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state( "ngModelState", {
		name:"ngModelStateView",
		url : "/",
		controller : "mainController as gridView",
		templateUrl: "templates/ngModelStateView.html"
	})

	.state( "ngSideApproach", {
		name:"ngSideApproachView",
		url : "/slide",
		controller : "slideController as slideView",
		templateUrl: "templates/ngSideApproachView.html"
	});

})