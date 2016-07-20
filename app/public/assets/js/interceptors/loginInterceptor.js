(function(){
	'use strict';

	angular
		.module('PDIAP')
		.factory("loginInterceptor", function ($q, $location, $rootScope, $timeout) {
			return {
				request: function(config) {
					$rootScope.loading = true;
					return config;
				},
				requestError: function(rejection) {
					$rootScope.loading = false;
					console.log("request: "+rejection.status);
					return $q.reject(rejection);
				},
				response: function(response) {
					$timeout(function() {
						$rootScope.loading = false;	
					}, 500);
					return response;
				},
				responseError: function(rejection) {
					$timeout(function() {
						$rootScope.loading = false;	
					}, 500);
					console.log("response: "+rejection.status);
					if (rejection.status === 401)
						console.log(rejection.status);
					if (rejection.status === 400) 
						console.log(rejection.status);
					return $q.reject(rejection);
				}
			};
		});

})();
