(function(){
	'use strict';

	angular
	.module('PDIAPa')
	.controller('confirmacaoCtrl', function($scope, $state, $stateParams, $location, adminAPI) {

		adminAPI.postConfirmacao($stateParams.idProjeto, $stateParams.situacao)
		.success(function(data) {
			console.log(data);
			$location.url('/projetos/confirmacao');
		})
		.error(function(status) {
			console.log("Error: "+status);
		});
	});
})();
