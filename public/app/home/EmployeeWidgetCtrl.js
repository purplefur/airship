angular.module('app').controller('EmployeeWidgetCtrl', function($scope, $location, UserContext, employees) {
  $scope.search = function() {
    employees.search($scope.searchText)
      .then(function(results) {
        UserContext.newContext({
          label: 'Search results for \'' + $scope.searchText + '\'',
          data: _.pluck(results, '_id')
        })
      });

    $location.path('/employees');
  };
});

angular.module('app').factory('UserContext', function(users, mvIdentity) {
  return {
    newContext: function(context) {
      users.withId(mvIdentity.currentUser._id)
        .then(function(user) {
          while (user.contexts.length > 0) {
            user.contexts.pop();
          }
          user.contexts.push(context);
          user.save();
        });
    }
  };
});