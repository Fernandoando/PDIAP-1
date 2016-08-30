(function(){
	'use strict';

	angular
	.module('PDIAP')
	.controller('adminCtrl', function($scope, $mdSidenav, $mdToast, adminAPI) {

    $scope.projetos = [];

		let carregarProjetos = function() {
			adminAPI.getTodosProjetos()
			.success(function(projetos) {
        $scope.projetos = projetos;
			})
      .error(function(status) {
        console.log(status);
      });
		};
		$scope.carregarProjetos = carregarProjetos;

		// $scope.toggleSidenav = function(menu) {
		// 	$mdSidenav(menu).toggle();
		// };
		// $scope.toast = function(message,tema) {
		// 	var toast = $mdToast.simple().textContent(message).action('✖').position('top right').theme(tema).hideDelay(10000);
		// 	$mdToast.show(toast);
		// };

	});
})();
