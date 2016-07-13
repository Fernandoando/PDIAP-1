(function(){
	'use strict';

	angular
		.module('PDIAP')
		.config(function($locationProvider, $httpProvider) {

    		// Verifica se o usuário está logado
		   	var checkLoggedin = function($q, $http, $location, $rootScope){
		   		
		      	var deferred = $q.defer(); // Inicializa nova promissa
		      	$rootScope.logado = false;

		      	$http.get('/projetos/home').success(function(projeto){
		        	// Authenticated
		        	if (projeto !== '0') {
		          		//$timeout(deferred.resolve, 0);
		          		$rootScope.logado = true;
		          		deferred.resolve();          
		        		// Not Authenticated
		    		} else {
			          	//$timeout(function(){deferred.reject();}, 0);
			          	$rootScope.message = 'Você precisa estar logado!';
			          	$rootScope.logado = false;         
			          	deferred.reject();
			          	$location.url('/login');
		      		}
		  		});

		      	return deferred.promise;
		  	};

		   	// Intercepta os erros do AJAX
		   	$httpProvider.interceptors.push("loginInterceptor");
		}) // fim da config
		.run(function($rootScope, $http, $location){
			$rootScope.message = '';
		   	// Função logout está disponível em todas as páginas
		   	$rootScope.logout = function(){
		   		$http.post('/projetos/logout');
		   		$rootScope.logado = false;
		    	$rootScope.message = 'Deslogado.';
		  		$location.url('/login');	
		   	};
		});
})();