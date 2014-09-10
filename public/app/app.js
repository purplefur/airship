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
      .state('records', {
        abstract: true,
        url: '/records',
        templateUrl: '/partials/records',
        resolve: {
          auth: function (mvAuth) {
            return mvAuth.authoriseAuthenticatedUserForRoute();
          },
          recordsPageModel: 'recordsPageModel',
          employeeSvc: 'employeeSvc',
          contextSvc: 'contextSvc'
        },
        onEnter: function(recordsPageModel) {
          recordsPageModel.reset();
        }
      })
      .state('records.list', {
        url: '',
        views: {
          toolbar: {
            templateUrl: '/partials/records/toolbar',
            controller: 'toolbarCtrl'
          },
          screens: {
            templateUrl: '/partials/records/screens',
            controller: function($scope, recordsPageModel) {
              $scope.model = recordsPageModel;
              $scope.selectScreen = function (screen) {
                $scope.model.selectScreen(screen);
              };
              console.log('records.list records view Ctrl');
            }
          },
          context: {
            templateUrl: '/partials/records/context',
            controller: function($scope, recordsPageModel, $state) {
              $scope.model = recordsPageModel;
              $scope.selectContext = function(context) {
                $scope.model.unwindContext(context);
                $state.go('records.list');
              };
            }
          },
          records: {
            templateUrl: '/partials/records/multiple-records',
            controller: function($scope, recordsPageModel, $state) {
              $scope.model = recordsPageModel;
              $scope.drillIntoRecord = function(recordId, displayName) {
                $scope.model.pushContext({
                  label: displayName,
                  data: [{ _id: recordId }]
                });
                console.log('records.list multiple-records Ctrl');
                $state.transitionTo('records.list.single', { recordId: recordId });
              };
              $scope.parseValue = function(field) {
                var parsedValue = field.value;
                if (field.type === 'date') {
                  parsedValue = moment(field.value).format('Do MMM YYYY');
                }
                return parsedValue;
              };
            }
          }
        }
      })
      .state('records.list.single', {
        url: '/:recordId',
        views: {
          'records@records' : {
            templateUrl: '/partials/records/single-record',
            controller: function ($scope, recordsPageModel, employeeSvc) {
              $scope.model = recordsPageModel;
              $scope.formData = {};

              $scope.editRecord = function () {
                $scope.model.setMode('edit');
              };

              $scope.cancelEditRecord = function () {
                $scope.model.setMode('view');
              };

              $scope.saveRecord = function () {
                $scope.model.saveSingleTemplateData($scope.formData);
              };

              $scope.$watch('model.activeContext', function () {
                if ($scope.model.activeContext) {
                  var data = $scope.model.activeContext.data;
                  if (data.length === 1) {
                    employeeSvc.findById(data[0]._id)
                      .then(function (record) {
                        $scope.summary = getSummaryDetails(record);
                      });
                  }
                }
              });

              function getSummaryDetails(record) {
                var losMonths = moment().diff(moment(record.contService), 'months');
                return {
                  jobTitle: record.job.title,
                  reportsTo: record.job.reportsTo,
                  los: {
                    years: Math.floor(losMonths / 12),
                    months: losMonths % 12
                  }
                };
              }
            }
          }
        }
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
      .state('designer.screens.details', {
        url: '/:screenId',
        templateUrl: '/partials/designer/designer-screens-details',
        controller: 'DesignerScreenDetailsCtrl',
        resolve: routeRoleChecks.user
      })
      .state('designer.fields', {
        url: '/entity/:entityId/screens/:screenId/fields',
        templateUrl: '/partials/designer/designer-fields',
        controller: 'DesignerFieldsCtrl',
        resolve: {
          authenticated: function() {
            return routeRoleChecks.user;
          },
          entity: function(entitySvc, $stateParams) {
            return entitySvc.findById($stateParams.entityId);
          }
        }
      })
      .state('designer.fields.details', {
        url: '/:fieldId',
        templateUrl: '/partials/designer/designer-fields-details',
        controller: 'DesignerFieldDetailsCtrl',
        resolve: routeRoleChecks.user
      });
  });

angular.module('app').run(function ($rootScope, $state) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    console.log(toState);
    console.log('Moving from state ' + fromState.name + ' to state ' + toState.name);
  });

  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    if (error === 'not authorized') {
      $state.go('login');
    }
  });
});