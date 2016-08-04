(function(){
	'use strict';

	angular
	.module('PDIAP')
	.config(function($mdIconProvider, $mdThemingProvider) {
		$mdThemingProvider.theme('error')
		.primaryPalette('red');
		$mdThemingProvider.theme('alert');
		$mdIconProvider
		.defaultIconSet('assets/mdi.svg')
	});
})();
