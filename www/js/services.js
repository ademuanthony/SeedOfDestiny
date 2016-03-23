// This is a JavaScript file

app.factory('sodService', ['$q', '$http', 'localStorageService', '_', function ($q, $http, localStorageService, _) {
    var sodService = {};
    var currentSeed = undefined;
    var yesterdaySeed = undefined;
    var todaySeed = undefined;
    var tomorrowSeed = undefined;

    sodService.getYesterdaySeed = function () {
        if (angular.isDefined(yesterdaySeed)) {
            var defer = $q.defer();
            defer.resolve(yesterdaySeed);
            return defer.promise;
        }
        var todayDate = new Date();
        todayDate.setDate(todayDate.getDate() - 1);
        return $http.get('http://seedofdestiny.ademuanthony.com/api/seedapi/GetSeed?day=' + 
        todayDate.getDate() + '&month=' + (todayDate.getMonth() + 1) + '&year=' + todayDate.getFullYear()).then(function (results) {
            yesterdaySeed = results;
            return results;
        });
    }
    
    
    sodService.getTodaySeed = function () {
        if (angular.isDefined(todaySeed)) {
            var defer = $q.defer();
            defer.resolve(todaySeed);
            return defer.promise;
        }
        var todayDate = new Date();
        return $http.get('http://seedofdestiny.ademuanthony.com/api/seedapi/GetSeed?day=' + 
        todayDate.getDate() + '&month=' + (todayDate.getMonth() + 1) + '&year=' + todayDate.getFullYear()).then(function (results) {
            todaySeed = results;
            return results;
        });
    }
    
    
    
    sodService.getTomorrowSeed = function () {
        if (angular.isDefined(tomorrowSeed)) {
            var defer = $q.defer();
            defer.resolve(tomorrowSeed);
            return defer.promise;
        }
        
        var todayDate = new Date();
        todayDate.setDate(todayDate.getDate() + 1);
        return $http.get('http://seedofdestiny.ademuanthony.com/api/seedapi/GetSeed?day=' + 
        todayDate.getDate() + '&month=' + (todayDate.getMonth() + 1) + '&year=' + todayDate.getFullYear()).then(function (results) {
            tomorrowSeed = results;
            return results;
        });
    }
    

    sodService.getCurrentSeed = function () {
        if (angular.isDefined(currentSeed)) {
            var defer = $q.defer();
            defer.resolve(currentSeed);
            return defer.promise;
        }
        return sodService.getTodaySeed();
    }

    sodService.setCurrentSeed = function (seed) {
        currentSeed = currentSeed || {};
        currentSeed.data = seed;
    }

    sodService.getFavourites = function () {
        var favourites = localStorageService.get('favourites');
        if (!favourites) {
            favourites = [];
            localStorageService.set('favourites', favourites);
        }
        return favourites;
    }

    sodService.getFavourite = function (seedId) {
        return _.findWhere(favourites, {id: seedId});
    }

    sodService.addToFavourites = function (seed) {
        var favourites = sodService.getFavourites();
        favourites.push(seed);
        localStorageService.set('favourites', favourites);
    }

    sodService.removeFromFavourites = function (seedId) {
        var favourites = sodService.getFavourites();
        var fav = _.findWhere(favourites, {id: seedId});
        
        var index = favourites.indexOf(fav);
        if (index > -1) {
            favourites.splice(index, 1);
        }
        localStorageService.set('favourites', favourites);
    }
       

    sodService.isInFavourite = function (seed) {
        var fav = _.findWhere(sodService.getFavourites(), {id: seed.id});
        if(fav){return true;}
        return false;
    }
    
    
    return sodService;
}]);