"use strict";

var GridTemplate = [
			'<div><ul class="titles"><li  ng-repeat="(key,val) in titles"><h4>{{val}}</h4></li></ul>',
			'<div class="rowContent" ng-repeat="data in page" ng-show=data.show>',
				'<ul><li  ng-repeat="d in data.pageData"><input type=number ng-model=d.mk  /></li></ul>',
				'<ul ><li  ng-repeat="d in data.pageData"><input type=number ng-model=d.controlNumber  /></li></ul>',
				'<ul ><li  ng-repeat="d in data.pageData"><input type=text ng-model=d.control  /></li></ul>',
				'<ul ><li  ng-repeat="d in data.pageData"><input type=text ng-model=d.prefix  /></li></ul>',
				'<ul ><li  ng-repeat="d in data.pageData"><input type=text ng-model=d.base  /></li></ul>',
				'<ul ><li  ng-repeat="d in data.pageData"><input type=text ng-model=d.suffix  /></li></ul>',
				'<ul ><li  ng-repeat="d in data.pageData"><input type=number ng-model=d.sp  /></li></ul>',
				'<ul ><li  ng-repeat="d in data.pageData"><input type=number ng-model=d.trimin  /></li></ul>',
				'<ul ><li  ng-repeat="d in data.pageData"><input type=number ng-model=d.offline  /></li></ul>',
				'<ul ><li  ng-repeat="d in data.pageData"><input type=text ng-model=d.engine  /></li></ul></div>',
			'<div class="pageNavigator"><ul><li ng-repeat="navi in pages"><a ng-href="">{{$index+1}}</a></li></ul></div></div>'
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

			var currentPage = 0;

			scope.titles = [];

			var pageNavigation = function( pageNo ){

				scope.pages[currentPage].show = false;
				scope.page = [scope.pages[pageNo]];
				scope.pages[pageNo].show = true;
				scope.$apply( );
			}

			$timeout(function () {
   				scope.page = [scope.pages[currentPage]];
   				var getTitles = scope.page[0].pageData[0];
   				var num = 0;
   				var label;
   				for( label in getTitles ){
   					if( num < 10 ){
   						scope.titles.push( label );
   					}
   					num++;
   				}
			});

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
