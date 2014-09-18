angular.module('records').factory('referenceDataSvc', function($http) {

  return {
    getReferenceDataWithId: function(id) {
      return $http.get('/api/referenceData/' + id);
    }
  };
});
