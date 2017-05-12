"use strict";

var modules = [ "gridData.controllers", "gridData.factories", "gridData.services"];


var gridData = angular.module( "gridDataApp", modules );


angular.module("gridData.controllers", [])
.controller("mainController", ["$scope", "$timeout", "apiService",
	function( $scope, $timeout, apiService ){

	var gridView  = this;

	apiService.generateData( ).then(function( data ){

		var start = new Date( );

		gridView.gridData = data;

		$timeout( function( ) {
			console.log( "time taken :",  (new Date( ) - start) );
		} , 0 );

	});

	gridView.title = "First Testing!!";
	
	return gridView;

}]);