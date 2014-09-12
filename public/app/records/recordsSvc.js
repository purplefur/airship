angular.module('records').factory('recordsSvc', function($http) {

  return {

    getDataForScreen: function(entity, screen) {
      return $http.get('/api/record/' + entity + '/' + screen);
    }

  };
});
