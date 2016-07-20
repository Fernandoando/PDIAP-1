(function(){
	'use strict';

	angular
		.module('PDIAP')
		.controller('adminCtrl', function($scope, $location, projetosAPI) {

  			$scope.projeto = {};
  			$scope.projetos = [];
  			$scope.integrantes = [];

  			projetosAPI.getProjeto()
  			.success(function(projetos) {
		        $scope.projeto = projetos;
		        console.log(projetos);
		        for (var i in projetos.integrantes){
					$scope.projetos.push(projetos.integrantes[i]);
		        }

		   //      if (projeto !== '0') {
     //   				projetosAPI.getTodosProjetos()
					// .success(function(projetos) {
					//     for (var i in projetos)
					//       	$scope.projetos.push(projetos[i]);
					// });
		   //  	} else {
			  //       $location.url('/login');
		   //    	}
		  	});

		  	
		});
})();