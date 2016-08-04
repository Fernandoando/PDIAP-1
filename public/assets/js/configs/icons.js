(function(){
	'use strict';

	angular
	.module('PDIAP')
	.config(function($mdIconProvider, $mdThemingProvider) {
		$mdThemingProvider.theme('error')
		.primaryPalette('red');
		$mdIconProvider
		.defaultIconSet('assets/mdi.svg')
	});
})();
