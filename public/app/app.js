angular.module('airship', [
  'ngResource',
  'ui.router',
  'ui.bootstrap',
  'notification',
  'auth',
  'dashboard'//,
//  'records',
//  'employee'
])
  .config(function ($stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true);
//    $stateProvider
//      .state('designer', {
//        url: '/designer',
//        abstract: true,
//        templateUrl: '/partials/designer'
//      })
//      .state('designer.entities', {
//        url: '',
//        templateUrl: '/partials/designer/designer-entities',
//        controller: 'DesignerCtrl',
//        resolve: routeRoleChecks.user
//      })
//      .state('designer.entities.details', {
//        url: '/entity/:entityId',
//        templateUrl: '/partials/designer/designer-entities-details',
//        controller: 'DesignerEntityCtrl',
//        resolve: routeRoleChecks.user
//      })
//      .state('designer.screens', {
//        url: '/entity/:entityId/screens',
//        templateUrl: '/partials/designer/designer-screens',
//        controller: 'DesignerScreensCtrl',
//        resolve: routeRoleChecks.user
//      })
//      .state('designer.screens.details', {
//        url: '/:screenId',
//        templateUrl: '/partials/designer/designer-screens-details',
//        controller: 'DesignerScreenDetailsCtrl',
//        resolve: routeRoleChecks.user
//      })
//      .state('designer.fields', {
//        url: '/entity/:entityId/screens/:screenId/fields',
//        templateUrl: '/partials/designer/designer-fields',
//        controller: 'DesignerFieldsCtrl',
//        resolve: {
//          authenticated: function() {
//            return routeRoleChecks.user;
//          },
//          entity: function(entitySvc, $stateParams) {
//            return entitySvc.findById($stateParams.entityId);
//          }
//        }
//      })
//      .state('designer.fields.details', {
//        url: '/:fieldId',
//        templateUrl: '/partials/designer/designer-fields-details',
//        controller: 'DesignerFieldDetailsCtrl',
//        resolve: routeRoleChecks.user
//      });
  });

angular.module('airship').run(function ($rootScope, $state) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    console.log(toState);
    console.log('Moving from state ' + fromState.name + ' to state ' + toState.name);
  });

  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    console.log(error);
    if (error === 'not authenticated') {
      $state.go('login');
    }
  });
});