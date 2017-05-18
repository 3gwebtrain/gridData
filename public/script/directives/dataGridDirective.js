"use strict";

var GridTemplate = [
			'<div>',
				'<div>',
					'<ul class="titles"><li  ng-repeat="page in currentPage">{{page.title}}</li></ul>',
					'<div class="rowContent">',
					'<ul ng-repeat="(title,page) in currentPage">',
						'<li  ng-repeat="element in page.key track by $index">',
						'<input type="text" name="" id="" ng-model=element ng-blur="numsorter( page )" /></li></ul></div>',
					'<div class="pageNavigator"><ul><li  ng-repeat="page in slides"><a ng-href="">{{$index+1}}</a></li></ul></div>',
				'</div>',
			'</div>'
			];

var dataGridMaker = function( $timeout ) {

	return {
		scope: {
			"pages" : "=",
			"viewports":"=",
			"numsorter":"&arrangeBy"
		},
		replace: true,
		template :GridTemplate.join(''),
		link: function(  scope, element, attrs ) {

			scope.slides = [];

			var pageNavigation = function( pageNo ){
				
				if( scope.slides[pageNo] ) {
					scope.currentPage = scope.slides[pageNo];
					console.log( scope.currentPage );
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
				pageNavigation( 0 );
			})

			//navigation page click stuff;-

			var elemPageNavi = $(element).find('.pageNavigator');
			
			elemPageNavi.on( 'click', 'a',  function ( ) {
				var requiredPage = Number($(this).text());
				pageNavigation( requiredPage-1 );
			});			
			
		}
	}

}

angular.module( "gridDataApp.directives", [])
.directive( "customGrid", dataGridMaker );
