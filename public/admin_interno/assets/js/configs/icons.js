(function(){
	'use strict';

	angular
	.module('PDIAP')
	.config(function($mdIconProvider, $mdThemingProvider) {
		$mdThemingProvider.theme('error')
		.primaryPalette('red');
		$mdThemingProvider.theme('padrao')
		.primaryPalette('grey');
		$mdIconProvider
		.defaultIconSet('admin-interno/assets/mdi.svg')
	});
})();
