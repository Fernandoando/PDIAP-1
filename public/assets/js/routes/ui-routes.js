(function(){
	'use strict';

	angular
	.module('PDIAP')
	.config(function($locationProvider, $httpProvider, $stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider) {

		$locationProvider.html5Mode(true);
		$urlMatcherFactoryProvider.caseInsensitive(true);
		$urlRouterProvider.otherwise("/404");

		let checkLoggedin = function($q, $http, $location, $rootScope) {

			var deferred = $q.defer(); // Inicializa nova promissa
			$rootScope.logado = false;

			$http.get('/projetos/home').success(function(projeto) {
				if (projeto !== '0') { // Authenticated
					$rootScope.logado = true;
					deferred.resolve();
				} else { // Not Authenticated
					$rootScope.logado = false;
					deferred.reject();
					$location.url('/');
				}
			});
			return deferred.promise;
		};

		$stateProvider
		.state('index', {
			url: "/",
			views: {
				'': {
					templateUrl: '/alpha/index.html',
					controller: "homeCtrl"
				}
			}
		})
		// .state('login', {
		// 	url: "/login",
		// 	templateUrl: "/views/login.html",
		// 	controller: "loginCtrl"
		// })
		.state('inscricao', {
			url: "/projetos/inscricao",
			templateUrl: "/views/inscricao.html",
			controller: "registroCtrl"
		})
		.state('regulamento', {
			url: "/regulamento",
			templateUrl: "/alpha/regulamento.html"
		})
		.state('avaliacao-fundamental', {
			url: "/avaliacao-fundamental",
			templateUrl: "/alpha/avaliacao-fundamental.html"
		})
		.state('avaliacao-medio', {
			url: "/avaliacao-medio",
			templateUrl: "/alpha/avaliacao-medio.html"
		})
		.state('contato', {
			url: "/contato",
			templateUrl: "/alpha/contact.html",
			controller: "contatoCtrl"
		})
		.state('categorias-eixos', {
			url: "/categorias-eixos",
			templateUrl: "/alpha/categorias-eixos.html"
		})
		.state('saberes-docentes', {
			url: "/saberes-docentes/inscricao",
			templateUrl: "/views/saberes.html",
			controller: "saberesCtrl"
		})
		.state('avaliadores', {
			url: "/avaliadores/inscricao",
			templateUrl: "/views/avaliadores.html",
			controller: "avaliadoresCtrl"
		})
		.state('home', {
			url: "/home",
			views: {
				'': {
					templateUrl: '/views/admin.html',
					controller: 'adminCtrl'
				},
				'@home': {templateUrl: '/views/home-admin.html'}
			},
			resolve: {
				loggedin: checkLoggedin
			}
		})
		.state('home.update', {
			url: "/update",
			templateUrl: "/views/update.html",
			controller: "updateCtrl"
		})
		.state('home.conta', {
			url: "/update-conta",
			templateUrl: "/views/conta.html",
			controller: "updateCtrl"
		})
		.state('home.regulamento', {
			url: "/regulamento",
			templateUrl: "/views/regulamento.html"
		})
		.state('home.categorias-eixos', {
			url: "/categorias-eixos",
			templateUrl: "/views/categorias-eixos.html"
		})
		.state('home.avaliacao-fundamental', {
			url: "/avaliacao-fundamental",
			templateUrl: "/views/avaliacao-fundamental.html"
		})
		.state('home.avaliacao-medio', {
			url: "/avaliacao-medio",
			templateUrl: "/views/avaliacao-medio.html"
		})
		.state('nova-senha', {
			url: "/nova-senha/:username/:token",
			templateUrl: "/views/nova-senha.html",
			controller: "redefinirCtrl"
		})
		.state('404', {
			url: "/404",
			templateUrl: "/views/404.html"
		});
	});
})();
