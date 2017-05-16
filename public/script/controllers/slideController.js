angular.module("gridDataApp.controllers", [])
.controller("slideController", ["$scope", "$timeout", "apiService","$filter",
	function( $scope, $timeout, apiService, $filter  ){

	var gridView  = this;
	var slice = null;
	gridView.baseData = null;
	gridView.pages = []; 
	gridView.dataTitles = [];
	gridView.activeIndex = 0;
	gridView.viewPorts = 10;

	gridView.pageDataMaker = function( ) {

		gridView.layData = gridView.baseData;

		gridView.layData.forEach( function(  object, index ){
			!gridView.pages[index] ? gridView.pages[index] = [] : gridView.pages[index];
			angular.forEach( object, function( value, key ){
				!gridView.pages[key] ? gridView.pages[key] = {} : gridView.pages[key];
				!gridView.pages[key]["title"] ? gridView.pages[key]["title"] = key : gridView.pages[key]["title"];
				!gridView.pages[key]["data"] ? gridView.pages[key]["data"] = [] : gridView.pages[key]["data"];
				gridView.pages[key]["data"].push( value );
			});
			console.log( gridView.pages );
		})

	}


	apiService.generateData( ).then(function( data ){

		gridView.baseData =  data;
		gridView.pageDataMaker(  );

	});

	gridView.title = "First Testing!!";
	
	return gridView;

}]);