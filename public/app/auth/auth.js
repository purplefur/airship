angular.module('auth', [
  'ui.router',
  'notification'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: '/partials/auth/login',
        controller: 'loginCtrl'
      });
  });

var routeAuthChecks = {
  admin: { auth: function (mvAuth) {
    return mvAuth.authoriseCurrentUserForRoute('admin');
  }},
  user: { auth: function (mvAuth) {
    return mvAuth.authoriseAuthenticatedUserForRoute();
  }}
};

