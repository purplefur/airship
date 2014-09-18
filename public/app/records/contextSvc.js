angular.module('records').factory('contextSvc', function ($http) {

  return {
    setContextFromQuickSearch: function (entityName, searchText) {

      var url = '/api/context/' + entityName;
      var searchDetails = {
        searchText: searchText
      };

      switch (entityName) {
        case 'employee':
          searchDetails.searchFields = [
            "firstName",
            "surname"
          ];
          break;

        case 'post':
          searchDetails.searchFields = [
            "id",
            "name"
          ];
          break;
      }

      return $http.post(url, searchDetails);
    },

    getContext: function (entityName) {
      return $http.get('/api/context/' + entityName);
    },

    clearContext: function (entityName) {
      return $http.delete('/api/context/' + entityName);
    }
  };

});