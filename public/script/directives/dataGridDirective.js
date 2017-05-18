"use strict";

var GridTemplate = [
			'<div>',
				'<div>',
					'<ul class="titles"><li  ng-repeat="page in currentPage">{{page.title}}</li></ul>',
					'<div class="rowContent">',
					'<ul ng-repeat="(title,page) in currentPage">',
						'<li  ng-repeat="element in page.key track by $index">',
						'<input type="text" name="" id="" ng-model=element ng-blur="numSort( page )" /></li></ul></div>',
					'<div class="pageNavigator"><ul><li  ng-repeat="page in slides"><a ng-href="">{{$index+1}}</a></li></ul></div>',
				'</div>',
			'</div>'
			];

var dataGridMaker = function( $timeout, $filter ) {

	return {
		scope: {
			"pages" : "=",
			"viewports":"=",
			"numsorter":"&arrangeBy"
		},
		replace: true,
		template :GridTemplate.join(''),
		link: function(  scope, element, attrs ) {

			scope.slides = [], scope.currentPageNo = 0;

			scope.numSort = function(  titleToSort ) {
				var requiredTitle = titleToSort ? titleToSort.title : scope.slides[0][1].title;
				console.log( requiredTitle );
				scope.slides[scope.currentPageNo].forEach( function( item, index ){
					if( item.title == requiredTitle ){
						return item.key = $filter('orderBy')(item.key,"");
						// scope.$apply( );
					}
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
				scope.numSort(  );
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
