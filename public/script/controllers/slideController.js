angular.module("gridDataApp.controllers", [])
.controller("slideController", ["$scope", "$timeout", "apiService","$filter",
	function( $scope, $timeout, apiService, $filter  ){

	var gridView  = this;
	var slice = null;
	gridView.baseData = null;
	gridView.pages = []; 
	gridView.activeIndex = 0;
	gridView.viewPorts = 12;

	gridView.pageDataMaker = function( ) {

		gridView.layData = gridView.baseData;

		gridView.layData.forEach(function(e) {
			var that = this;
			Object.keys(e).forEach(function(key) {
				if(!that[key]) that[key] = {["key"]: [],"title":key}, gridView.pages.push(that[key])
					that[key]["key"].push(e[key])
			})
		}, {});

	}


	apiService.generateData( ).then(function( data ){

		gridView.baseData =  data;
		gridView.pageDataMaker(  );

	});

	gridView.numSort = function(  title ) {
		console.log( "title to sort is ", title  );
	}

	gridView.title = "First Testing!!";
	
	return gridView;

}]);