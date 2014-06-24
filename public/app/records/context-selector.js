angular.module('app').directive('contextSelector', function(contextSvc) {
  return {
    restrict: 'E',
    templateUrl: '/partials/records/context-selector',
    controller: function($scope, recordsPageModel) {

      $scope.recordsPageModel = recordsPageModel;
      contextSvc.getContextsForCurrentUser()
        .then(function(contexts) {
          $scope.contexts = contexts;
          $scope.recordsPageModel.setContext(_.last($scope.contexts));
        });
    }
  };
});