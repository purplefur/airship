angular.module('app', ['ngResource', 'ngRoute', 'ui.bootstrap'])
  .config(function ($routeProvider, $locationProvider) {

    var routeRoleChecks = {
      admin: { auth: function (mvAuth) {
        return mvAuth.authoriseCurrentUserForRoute('admin');
      }},
      user: { auth: function (mvAuth) {
        return mvAuth.authoriseAuthenticatedUserForRoute();
      }}
    };

    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', { templateUrl: '/partials/home/home', controller: 'HomeCtrl', resolve: routeRoleChecks.user })
      .when('/records', { templateUrl: '/partials/records/main', controller: 'RecordsMainCtrl', resolve: routeRoleChecks.user })
      .when('/login', { templateUrl: '/partials/account/login', controller: 'mvLoginCtrl' });
  });

  angular.module('app').run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
      if (rejection === 'not authorized') {
        $location.path('/login');
      }
    });

  });