angular.module('dashboard', [
  'auth',
  'records'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/',
        templateUrl: '/partials/dashboard',
        controller: 'dashboardCtrl',
        resolve: {
          authenticationSvc: 'authenticationSvc',
          auth: function(authenticationSvc) {
            return authenticationSvc.authenticateCurrentUser();
          }
        }
      })
  });
