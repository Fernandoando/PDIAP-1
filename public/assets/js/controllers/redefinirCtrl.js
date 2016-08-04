(function(){
	'use strict';

	angular
	.module('PDIAP')
	.controller('redefinirCtrl', function($scope, $location, $state, $stateParams, $mdDialog, projetosAPI) {

		$scope.username = 'proj1';
		$scope.username = $stateParams.username;
		$scope.token = $stateParams.token;
		console.log($stateParams.token);

		$scope.newPasswordDialog = function(ev) {
			$mdDialog.show({
				// controller: () => this,
				templateUrl: '/views/nova-senha-dialog.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: false
			})
			.then(function(answer) {
				console.log(answer);
			}, function() {
				console.log('fechou');
			});
		};

		// projetosAPI.getNewPassword()
		// .success(function(data) {
		// 	console.log(data);
		// })
		// .error(function(status) {
		// 	console.log(status);
		// });

		$scope.newPasswordOK = function(password) {
			console.log(pasword);
			// projetosAPI.postNewPassword(password)
			// .success(function(data) {
			// 	console.log(data);
			// })
			// .error(function(status) {
			// 	console.log(status);
			// });
		};
	});
})();
