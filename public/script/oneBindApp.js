"use strict";

var modules = [ "oneBindApp.controllers"];

var oneBindApp = angular.module( "oneBindApp", modules );

angular.module("oneBindApp.controllers", [])
.controller("mainController", ["$scope","$q", function( $scope, $q){

	var main  = this;
	
	var getData = function( label ) {

		var time = new Date() ;
		var sec = time.getSeconds() < 10 ? "0" + time.getSeconds()  : time.getSeconds();
		var promises  = [];
		var num = 500;
		for( var i = 0; i < num; i++ ) {
			promises.push ({
				name:"name"+sec,
				city:"city"+sec,
				age:"age"+sec,
				id : i
			} );
		}

		return $q.all( promises );
	}

	main.appendData = function( label ) {
		
		getData( label ).then( function( data ) {

			var startTime = new Date();

			if(  label === 'oneTime' ){
				main.oneTimeData = data;
			}

			if(  label !== 'oneTime' ){
				main.twoWayData = data;
			}
		

			 setTimeout(function(){
        				console.log('Process time: ' + (new Date() - startTime));
      			})

		})

	}

	return main;

}])