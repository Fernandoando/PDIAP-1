(function(){
	'use strict';

	angular
		.module('myApp')
		.config(interceptorPush);

	interceptorPush.$inject = ['$httpProvider'];

	function interceptorPush($httpProvider) {
		$httpProvider.interceptors.push('authInterceptor');
	}
})();