angular.module('records').factory('entitySvc', function ($http) {

  return {

    getScreens: function (entity) {
      return $http.get('/api/entity/' + entity + '/screen');
    },

    getScreen: function (entity, screen) {
      return $http.get('/api/entity/' + entity + '/screen/' + screen);
    }
  }

});
