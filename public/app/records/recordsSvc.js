angular.module('records').factory('recordsSvc', function($http) {

  return {

    getDataForScreen: function(entity, screen) {
      return $http.get('/api/record/' + entity + '/' + screen);
    },

    setDataForScreen: function(entity, screen, recordId, data) {
      return $http.post('/api/record/' + entity + '/' + screen + '/' + recordId, data);
    }

  };
});
