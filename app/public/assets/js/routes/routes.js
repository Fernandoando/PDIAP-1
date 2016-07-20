(function(){
	'use strict';

	angular
		.module('PDIAP')
		.config(['$routeProvider', function($routeProvider, $locationProvider) {
			$routeProvider
				.when('/', {
		    		templateUrl: '/views/index.html'
			   	})
			   	.when('/home', {
			    	templateUrl: '/views/oi.html',
			    	controller: 'adminCtrl',
			    	// resolve: {
			    	// 	loggedin: checkLoggedin
			    	// }
			   	})
			   	.when('/login', {
			    	templateUrl: '/views/login.html',
			    	controller: 'loginCtrl'
			   	})
			   	.when('/inscricao', {
			    	templateUrl: '/views/inscricao.html',
			    	controller: 'registroCtrl'
			   	})
			   	.when('/update', {
			    	templateUrl: '/views/update.html',
			    	controller: 'adminCtrl'
			   	});
			   	// .otherwise({
			    // 	redirectTo: '/'
			   	// });
		}]);

})();
