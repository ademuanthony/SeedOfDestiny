// This is a JavaScript file

app.controller('favouritesController', [
    '$scope', 'sodService', function ($scope, sodService) {

        $scope.favourites = sodService.getFavourites();
        

        $scope.readFavourite = function (seed) {
            sodService.setCurrentSeed(seed);
            app.slidingMenu.setMainPage('favourites/favourite.html');
        }

    }
]);

app.controller('favouriteController', [
    '$scope', 'sodService', function ($scope, sodService) {

        sodService.getCurrentSeed().then(function successCallback(response) {
            $scope.seed = response.data;
            if (sodService.isInFavourite($scope.seed)) {
                $scope.addToFavIcon = "fa fa-star";
            } else {
                $scope.addToFavIcon = "ion plus";
            }

        }, function errorCallback(response) {
            alert('error in loading seed. check your network connection and try again ');
        });
        
        $scope.delete = function(){
            sodService.removeFromFavourites($scope.seed.id);     
            app.slidingMenu.setMainPage('favourites/favourites.html');
        }

    }
]);