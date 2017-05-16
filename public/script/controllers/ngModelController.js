angular.module("gridDataApp.controllers", [])
.controller("mainController", ["$scope", "$timeout", "apiService","$filter",
	function( $scope, $timeout, apiService, $filter  ){

	var gridView  = this;
	var slice = null;

	gridView.resort = function( data  ){

		var start = new Date( );
		gridView.gridData = $filter( 'orderBy')( slice, "mk", false );
		$timeout( function( ) {
			console.log( "Sort time time :",  (new Date( ) - start) );
		} , 0 );
	}

	apiService.generateData( ).then(function( data ){

		var start = new Date( );

		gridView.gridData =  slice = $filter('orderBy')(data.splice( 0, 50 ), 'mk',  false );

		$timeout( function( ) {
			console.log( "Appending ng Repeat time :",  (new Date( ) - start) );
		} , 0 );

	});

	gridView.title = "First Testing!!";
	
	return gridView;

}]);