angular.module('auth').factory('authenticationSvc', function ($http, currentUserModel, $q) {
  return {
    authenticate: function (username, password) {
      var deferred = $q.defer();
      $http.post('/login', { username: username, password: password }).then(function (response) {
        if (response.data.success) {
//                    var user = new mvUser();
//                    angular.extend(user, response.data.user);
//                    mvIdentity.currentUser = user;
          currentUserModel.user = response.data.user;
          deferred.resolve(true);
        } else {
          deferred.resolve(false);
        }
      });
      return deferred.promise;
    },

    logout: function () {
      var deferred = $q.defer();
      $http.post('/logout', { logout: true }).then(function () {
        currentUserModel.user = undefined;
        deferred.resolve();
      });

      return deferred.promise;
    },

    authoriseCurrentUserForRole: function (role) {
      if (currentUserModel.isAuthorisedForRole(role)) {
        return true;
      } else {
        return $q.reject('not authorized');
      }
    },

    authenticateCurrentUser: function () {
      console.log();
      if (currentUserModel.isAuthenticated()) {
        return true;
      } else {
        return $q.reject('not authenticated');
      }
    }
  };
});
