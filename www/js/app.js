/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var
	    _routing = __webpack_require__(2),
	    _templates = {
	        app: __webpack_require__(3)
	    };

	__webpack_require__(4);

	angular.module('app', ['base', 'dash'])
	    .config(_routing)
	    .config(['localStorageServiceProvider', function(localStorageServiceProvider) {
	        localStorageServiceProvider
	            .setPrefix('app')
	            .setStorageType('localStorage')
	            .setNotify(true, true)
	    }])
	    .run(['$templateCache', function($templateCache) {
	        $templateCache.put('app.tpl', _templates.app);
	    }])
	    .run(['$ionicPlatform', function($ionicPlatform) {
	        $ionicPlatform.ready(function() {
	            if (window.cordova && window.cordova.plugins.Keyboard) {
	                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
	            }
	            if (window.StatusBar) {
	                StatusBar.styleDefault();
	            }
	        })
	    }])

	angular.element(document).ready(function() {
	    angular.bootstrap(document, ['app']);
	});


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = ['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	    $urlRouterProvider.otherwise("/app/dash");

	    $stateProvider
	        .state('app', {
	            url: "/app",
	            abstruct: true,
	            templateUrl: 'app.tpl'
	        })
	        .state('app.dash', {
	            url: "/dash",
	            templateUrl: 'dash.tpl',
	            controller : 'BarcodeCtrl'
	        })

	}]


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = "<ion-nav-bar class=\"bar\">\r\n    <ion-nav-back-button class=\"button-clear\">\r\n        <i class=\"ion-arrow-left-c\"></i> Back\r\n    </ion-nav-back-button>\r\n</ion-nav-bar>\r\n<ion-nav-view></ion-nav-view>\r\n";

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(5);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var
	    _templates = {
	        dash: __webpack_require__(6)
	    };

	angular.module('dash', [])
	    .run(['$templateCache', function($templateCache) {
	        $templateCache.put('dash.tpl', _templates.dash);
	    }])
	    .controller('BarcodeCtrl', ['$scope', '$cordovaBarcodeScanner', '$ionicLoading', function($scope, $cordovaBarcodeScanner, $ionicLoading) {

	        $scope.href = '';

	        $scope.startScaner = function() {
	            $ionicLoading.show({
	                template: 'Loading...',
	                duration: 1000
	            });

	            $cordovaBarcodeScanner
	                .scan()
	                .then(function(barcodeData) {
	                    /*
	                    alert("We got a barcode\n" +
	                        "Result: " + barcodeData.text + "\n" +
	                        "Format: " + barcodeData.format + "\n" +
	                        "Cancelled: " + barcodeData.cancelled);
											*/
	                    if (barcodeData.format) {
	                        $scope.href = barcodeData.text;
	                    }

	                }, function(error) {
	                    console.log(error);
	                });

	        }

	    }])


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "<ion-view>\r\n    <ion-content>\r\n        <div class=\"row\">\r\n            <div class=\"col text-center\">\r\n                <button class=\"button button-positive\" ng-click=\"startScaner()\">\r\n                    Start scanning\r\n                </button>\r\n            </div>\r\n        </div>\r\n        <div ng-show=\"href.length != 0\" class=\"row\">\r\n            <div class=\"col text-center\">\r\n                <a class=\"button button-positive\" ng-href=\"{{href}}\">{{ href }}</a>\r\n            </div>\r\n        </div>\r\n    </ion-content>\r\n</ion-view>\r\n";

/***/ }
/******/ ]);