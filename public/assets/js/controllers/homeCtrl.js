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
			})
			.then(function(answer) {
				console.log(answer);
			}, function() {
				console.log('fechou');
			});
		};

		$scope.showNewPasswordDialog = function(ev) {
			$mdDialog.show({
				// controller: () => this,
				templateUrl: '/views/nova-senha-dialog.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: false
			})
			.then(function(answer) {
				console.log(answer);
				$rootScope.username = answer;
			}, function() {
				console.log('fechou');
			});
		};
	});
	// ==========================================================
	function DialogController($scope, $mdDialog) {
		$scope.hide = function() {
			$mdDialog.hide();
		};
		$scope.cancel = function() {
			$mdDialog.cancel();
		};
		$scope.answer = function(answer) {
			$mdDialog.hide(answer);
		};
	};
	// ===========================================================
})();
