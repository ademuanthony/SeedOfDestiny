// This is a JavaScript file
var app = angular.module('sod', ['onsen', 'LocalStorageModule', 'ngUnderscore']);

app.filter('trustAsHtml', function ($sce) {
    return function (html) {
        return $sce.trustAsHtml(html); 
    };
});
