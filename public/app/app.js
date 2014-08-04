angular.module('app', ['ngResource', 'ui.router', 'ui.bootstrap'])
  .config(function ($stateProvider, $locationProvider) {

    var routeRoleChecks = {
      admin: { auth: function (mvAuth) {
        return mvAuth.authoriseCurrentUserForRoute('admin');
      }},
      user: { auth: function (mvAuth) {
        return mvAuth.authoriseAuthenticatedUserForRoute();
      }}
    };

    $locationProvider.html5Mode(true);
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/partials/home/home',
        controller: 'HomeCtrl',
        resolve: routeRoleChecks.user
      })
      .state('login', {
        url: '/login',
        templateUrl: '/partials/account/login',
        controller: 'mvLoginCtrl'
      })
      .state('designer', {
        url: '/designer',
        abstract: true,
        templateUrl: '/partials/designer'
      })
      .state('designer.entities', {
        url: '',
        templateUrl: '/partials/designer/designer-entities',
        controller: 'DesignerCtrl',
        resolve: routeRoleChecks.user
      })
      .state('designer.entities.details', {
        url: '/entity/:entityId',
        templateUrl: '/partials/designer/designer-entities-details',
        controller: 'DesignerEntityCtrl',
        resolve: routeRoleChecks.user
      })
      .state('designer.screens', {
        url: '/entity/:entityId/screens',
        templateUrl: '/partials/designer/designer-screens',
        controller: 'DesignerScreensCtrl',
        resolve: routeRoleChecks.user
      })
//      .state('designer.record.screen', {
//        url: '/record/:id',
//        templateUrl: '/partials/designer/record',
//        controller: 'DesignerRecordCtrl',
//        resolve: routeRoleChecks.user
//      })
    ;


//      .when('/', { templateUrl: '/partials/home/home', controller: 'HomeCtrl', resolve: routeRoleChecks.user })
//      .when('/records', { templateUrl: '/partials/records/main', controller: 'RecordsMainCtrl', resolve: routeRoleChecks.user })
//      .when('/designer', { templateUrl: '/partials/designer/main', controller: 'DesignerMainCtrl', resolve: routeRoleChecks.user })
//      .when('/login', { templateUrl: '/partials/account/login', controller: 'mvLoginCtrl' });
  });

angular.module('app').run(function ($rootScope, $state) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    if (error === 'not authorized') {
      $state.go('login');
    }
  });
});