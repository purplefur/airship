angular.module('app').directive('recordDisplay', function() {
  console.log('test');
  return {
    restrict: 'E',
    templateUrl: '/partials/records/record-display',
    controller: function($scope) {
      $scope.test = 'yo yo yo';
    }
  };
});