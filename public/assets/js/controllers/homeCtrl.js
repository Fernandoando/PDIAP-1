(function(){
	'use strict';

	angular
	.module('PDIAP')
	.controller('homeCtrl', function($scope, $rootScope, $location, $mdDialog) {

		$scope.showLoginDialog = function(ev) {
			$mdDialog.show({
				// controller: () => this,
				templateUrl: '/views/login.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true
			});
		};

	});
})();
