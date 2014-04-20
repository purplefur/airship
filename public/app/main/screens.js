angular.module('app').factory('screens', function(Restangular) {
    return Restangular.all('screens');
});