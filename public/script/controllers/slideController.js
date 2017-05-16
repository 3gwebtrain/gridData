angular.module("gridDataApp.controllers", [])
.controller("slideController", ["$scope", "$timeout", "apiService","$filter",
	function( $scope, $timeout, apiService, $filter  ){

	var gridView  = this;
	var slice = null;
	gridView.baseData = null;
	gridView.pages = []; 
	gridView.activeIndex = 0;
	gridView.viewPorts = 10;

	gridView.pageDataMaker = function( ) {

		var dataSize = gridView.baseData.length / gridView.viewPorts;
		
		for( var i = 0; i < dataSize; i++ ){
			gridView.pages[i] = {
				show : i ==0 ? true:false,
				pageData : gridView.baseData.splice( 0, gridView.viewPorts )
			};
		}

	}


	apiService.generateData( ).then(function( data ){

		gridView.baseData =  data;
		gridView.pageDataMaker(  );

	});

	gridView.title = "First Testing!!";
	
	return gridView;

}]);