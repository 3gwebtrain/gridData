"use strict";

var GridTemplate = [
			'<div>',
				'<div>',
					'<ul class="titles"><li  ng-repeat="page in currentPage">{{page.title}}</li></ul>',
					'<div class="rowContent">',
					'<ul ng-repeat="(title,page) in currentPage">',
						'<li  ng-repeat="(key,element) in page.key track by $index" ng-switch="page.key[key]">',
						'<input type="{{getInputType(page.key[key])}}" name="" id="" ng-model="page.key[key]" ng-blur="numSort( page )" />',
						'</li></ul></div>',
					'<div class="pageNavigator"><ul><li  ng-repeat="page in slides"><a ng-href="">{{$index+1}}</a></li></ul></div>',
				'</div>',
			'</div>'
			];

var dataGridMaker = function( $timeout, $filter ) {

	return {
		scope: {
			"pages" : "=",
			"viewports":"=",
			"numsorter":"&arrangeBy",
			"model":"=ngModel"
		},
		template :GridTemplate.join(''),
		link: function(  scope, element, attrs  ) {

			scope.slides = [], scope.currentPageNo = 0;

			scope.numSort = function( page  ) {

				console.log( page );

				page.key= $filter('orderBy')( page.key, '', false );
				$timeout(function(){
					scope.$apply();
				})
			}

			var pageNavigation = function( pageNo ){
				
				if( scope.slides[pageNo] ) {
					scope.currentPage = scope.slides[pageNo];
					scope.$apply( );
					return;
				}

				scope.slides[pageNo] = scope.pages.splice( 0, scope.keysSizes );
			}

			$timeout( function( ) {
				scope.keysSizes = scope.pages.length / scope.viewports;
				for( var i = 0; i < scope.viewports; i++ ) {
					pageNavigation( i );
				}
				pageNavigation( scope.currentPageNo );
				scope.numSort(  scope.slides[0][0]  );
			})

			//navigation page click stuff;-

			var elemPageNavi = $(element).find('.pageNavigator');
			
			elemPageNavi.on( 'click', 'a',  function ( ) {
				var requiredPage = Number($(this).text());
				pageNavigation( requiredPage-1 );
			});		

			scope.getInputType = function( param ){
				if(typeof param == "string") return "text";
				if(typeof param == "number") return "number";
 			}	
			
		}
	}

}

angular.module( "gridDataApp.directives", [])
.directive( "customGrid", dataGridMaker );
