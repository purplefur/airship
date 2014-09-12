angular.module('auth').factory('currentUserModel', function ($window) {

  var currentUser;
  if (!!$window.bootstrappedUserObject) {
    currentUser = $window.bootstrappedUserObject;
  }

  return {
    user: currentUser,
    isAuthenticated: function () {
      return !!this.user;
    },
    isAuthorisedForRole: function (role) {
      return !!this.user && this.user.roles.indexOf(role) > -1;
    }
  };
});
