"use strict";

var GridTemplate = [
			'<div>',
				'<div ng-repeat="page in pages" >',
					'<h4>{{page.title}}</h4>',
				'</div>',
			'</div>'
			];

var dataGridMaker = function( $timeout ) {

	return {
		scope: {
			"pages" : "=",
			"divisions":"="
		},
		replace: true,
		template :GridTemplate.join(''),
		link: function(  scope, element, attrs ) {

			console.log( scope.pages );

			var currentPage = 0;

			scope.titles = [];

			var pageNavigation = function( pageNo ){

				scope.pages[currentPage].show = false;
				scope.page = [scope.pages[pageNo]];
				scope.pages[pageNo].show = true;
				scope.$apply( );
			}

			//navigation page click stuff;-

			var elemPageNavi = $(element).find('.pageNavigator');
			
			elemPageNavi.on( 'click', 'a',  function ( ) {
				var requiredPage = Number($(this).text());
				pageNavigation( requiredPage-1 );
			})
			
			
		}
	}

}

angular.module( "gridDataApp.directives", [])
.directive( "customGrid", dataGridMaker );
