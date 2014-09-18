angular.module('dashboard').controller('postWidgetCtrl', function($scope, $location, $state, contextSvc) {
  $scope.search = function() {
    contextSvc.setContextFromQuickSearch('post', $scope.searchText)
      .then(function() {
        $state.go('records.list', {entity: 'post'});
      });
  };
});
