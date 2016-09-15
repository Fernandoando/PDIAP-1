(function(){
	'use strict';

	angular
	.module('PDIAP')
	.controller('fileUploadCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {

		$scope.policy = {
			"expiration": "2020-01-01T00:00:00Z",
			"conditions": [
				{"bucket": "angular-file-upload"},
				["starts-with", "$key", ""],
				{"acl": "private"},
				["starts-with", "$Content-Type", ""],
				["starts-with", "$filename", ""],
				["content-length-range", 0, 524288000]
			]
		};

		$scope.uploadFiles = function(file, errFiles) {
			$scope.f = file;
			$scope.errFile = errFiles && errFiles[0];
			if (file) {
				file.upload = Upload.upload({
					url: 'http://localhost/',
					data: {file: file}
				});

				// Upload.upload({
				// 	url: 'https://angular-file-upload.s3.amazonaws.com/', //S3 upload url including bucket name
				// 	method: 'POST',
				// 	data: {
				// 		key: file.name, // the key to store the file on S3, could be file name or customized
				// 		AWSAccessKeyId: <YOUR AWS AccessKey Id>,
				// 		acl: 'private', // sets the access to the uploaded file in the bucket: private, public-read, ...
				// 		policy: $scope.policy, // base64-encoded json policy (see article below)
				// 		signature: $scope.signature, // base64-encoded signature based on policy string (see article below)
				// 		"Content-Type": file.type != '' ? file.type : 'application/octet-stream', // content type of the file (NotEmpty)
				// 		filename: file.name, // this is needed for Flash polyfill IE8-9
				// 		file: file
				// 	}
				// });

				$scope.calcSize = file.size/1000;
				$scope.calcSize = parseFloat($scope.calcSize).toFixed(2);

				console.log(file);

				file.upload.then(function (response) {
					$timeout(function () {
						file.result = response.data;
					});
				}, function (response) {
					if (response.status > 0)
					$scope.errorMsg = response.status + ': ' + response.data;
				}, function (evt) {
					file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
				});
			}
		}

	}]);
})();
