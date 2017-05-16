"use strict";

angular.module("gridDataApp.factories", [])
	.factory('jsonMaker', ['$rootScope', function( $rootScope ){

		var charset = "abcdefghijklmnopqrstuvwxyz"; 

		return {
			init : function( ){
				console.log("init called");
			},
			createDigit : function( size ) {
				var val1, val2;
				size === 3 ? (  val1=999,  val2=100  )  
				:  size === 2 ? (  val1=99,  val2=10 )  
				:  size === 6 ? (  val1=999999,  val2=1000 )  : 0;
				//generates only 3/2 digit values
				return Math.floor( Math.random()*(val1-val2+1 )) + val2;
			},
			createPrefixedDigit : function( ){
				return "00"+(Math.floor( Math.random()*(999-100+1 )) + 100);
			},
			createAlphaNumaric:function( ){
				return Math.random( ).toString(36).substr(2, 7).toUpperCase( );
			},
			createAlphaValue : function( size ){
				var res = '';
				while( size-- ) {
					res += charset[Math.random() * charset.length | 0];
				}
				return String( res.toUpperCase( ) );
			},
			createAlphaSuffix : function(  size  ){
				var string = this.createAlphaValue( size ).split('');
				string.splice( 3, 0, "--" )
				string.splice( 5, 0, "--" )
				return string.join( '' );
			}
		}
}]);