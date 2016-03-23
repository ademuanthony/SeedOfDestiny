// This is a JavaScript file
app.controller('homeController', [
    '$scope', '$http', 'sodService', function ($scope, $http, sodService) {
        $scope.isFavourite = {};
        
        $scope.yesterday = {};
        $scope.today = {};
        $scope.tomorrow = {};
        
        $scope.load = function(){            
            
            sodService.getYesterdaySeed().then(function successCallback(response) {
                $scope.yesterday = response.data;                        
                $scope.isFavourite.yesterday = sodService.isInFavourite($scope.yesterday);
                
            }, function errorCallback(response) {
               
            });
            
            sodService.getTodaySeed().then(function successCallback(response) {
                $scope.today = response.data;                        
                $scope.isFavourite.today = sodService.isInFavourite($scope.today);
                $scope.loaded = true;

            }, function errorCallback(response) {
                 ons.notification.alert({
                  message: 'error in loading seed. check your network connection and try again!',
                  modifier: 'material'
                });
            });
    
    
            sodService.getTomorrowSeed().then(function successCallback(response) {
                $scope.tomorrow = response.data;                        
                $scope.isFavourite.tomorrow = sodService.isInFavourite($scope.tomorrow);
                
            }, function errorCallback(response) {
                //alert('error in loading seed. check your network connection and try again ' + response.errorMessage);
            });

        }
       
        $scope.refresh = function($done){
            sodService.getYesterdaySeed().then(function successCallback(response) {
                $scope.yesterday = response.data;                        
                $scope.isFavourite.yesterday = sodService.isInFavourite($scope.yesterday);                
                
                sodService.getTodaySeed().then(function successCallback(response) {
                    $scope.today = response.data;                        
                    $scope.isFavourite.today = sodService.isInFavourite($scope.today);
                    
                    sodService.getTomorrowSeed().then(function successCallback(response) {
                        $scope.tomorrow = response.data;                        
                        $scope.isFavourite.tomorrow = sodService.isInFavourite($scope.tomorrow);
                        
                        $done();
                        
                    }, function errorCallback(response) {
                        alert('error in loading seed. check your network connection and try again ');
                        $done();
                    });
                                
                }, function errorCallback(response) {
                    alert('error in loading seed. check your network connection and try again ');
                    $done();
                });
                
                
            }, function errorCallback(response) {
                alert('error in loading seed. check your network connection and try again ' + response.errorMessage);
                $done();
            });
        }
       
        $scope.toggleFavourite = function (day) {
            var seed = {};
            switch(day){
                case 'yesterday': seed = $scope.yesterday; break;
                case 'today': seed = $scope.today; break;
                case 'tomorrow': seed = $scope.tomorrow; break;
            }
            
            if (sodService.isInFavourite(seed)) {
                sodService.removeFromFavourites(seed.id);
                $scope.isFavourite[day] = false;
                 ons.notification.alert({
                  message: 'removed from favourites!',
                  modifier: 'material'
                });

            } else {
                sodService.addToFavourites(seed);
                $scope.isFavourite[day] = true;
                ons.notification.alert({
                  message: 'added to favourites!',
                  modifier: 'material'
                });

            }
        }

        $scope.load();
    }
]);
