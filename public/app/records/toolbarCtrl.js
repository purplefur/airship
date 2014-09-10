angular.module('app').controller('toolbarCtrl', function($scope, recordsPageModel, employeeSvc, contextSvc, $state) {

  $scope.model = recordsPageModel;

  $scope.search = function() {
    employeeSvc.search($scope.searchText)
      .then(function(results) {
        var contextDescription = $scope.searchText;
        if (!angular.isDefined(contextDescription)) {
          contextDescription = "[blank search]";
        }
        return contextSvc.newContext({
          label: 'Search results for \'' + contextDescription + '\'',
          data: _.map(results, function(res) { return { _id: res._id }; })
        });
      })
      .then(function() {
        $scope.model.reset();
        $state.go('records.list');
      });
  };
});

