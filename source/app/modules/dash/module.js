var
    _templates = {
        dash: require('./templates/dash.tpl.html')
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
