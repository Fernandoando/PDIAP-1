(function(){
	'use strict';

	angular
	.module('PDIAP')
	.controller('redefinirCtrl', function($scope, $state, $stateParams, $location, $mdDialog) {

		$scope.username = $stateParams.username;
		$scope.token = $stateParams.token;
		console.log($stateParams.token);
		console.log($stateParams.username);

		$scope.newPasswordDialog = function(ev) {
			$mdDialog.show({
				controller: novaSenha,
				templateUrl: '/views/nova-senha-dialog.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: false
			});
			function novaSenha($scope, projetosAPI) {
				$scope.redefinirSenha = function(password) {
					projetosAPI.postNewPassword(password, $stateParams.username, $stateParams.token)
					.success(function(data) {
						console.log(data);
						if (data === 'Senha alterada') {
							let showAlert1 = function(ev) {
								$mdDialog.show(
									$mdDialog.alert()
									.parent(angular.element(document.querySelector('#popupContainer2')))
									.clickOutsideToClose(false)
									.textContent('Senha atualizada com sucesso!')
									.ok('OK')
									.targetEvent(ev)
								).then(function(result) {
									$location.url('/');
								}, function() {});
							};
							showAlert1();
						} else {
							let showConfirmDialog = function(ev) {
								var confirm = $mdDialog.confirm()
								.title('Oxe...')
								.textContent('Erro ao atualizar a senha. A validade para cada redefinição dura uma hora, tente solicitar novamente.')
								.targetEvent(ev)
								.theme('error')
								.ok('Voltar')
								$mdDialog.show(confirm).then(function() {
									$location.url('/');
								}
								, function() {});
							};
							showConfirmDialog();
						}
					})
					.error(function(status) {
						console.log(status);
						let showConfirmDialog = function(ev) {
							var confirm = $mdDialog.confirm()
							.title('Oxe...')
							.textContent('Erro ao atualizar a senha. A validade para cada redefinição dura uma hora, tente solicitar novamente.')
							.targetEvent(ev)
							.theme('error')
							.ok('Voltar')
							$mdDialog.show(confirm).then(function() {
								$location.url('/');
							}
							, function() {});
						};
						showConfirmDialog();
					});
				};
			};
		};
	});
})();
