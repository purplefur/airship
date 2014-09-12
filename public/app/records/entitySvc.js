angular.module('records').factory('entitySvc', function ($http) {

  return {

    getScreens: function (entityName) {
      return $http.get('api/entity/' + entityName + '/screen');
    }
  }


});
