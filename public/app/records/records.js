angular.module('records', [
  'auth'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('records', {
        abstract: true,
        url: '/records/:entity',
        templateUrl: '/partials/records',
        resolve: {
          authenticationSvc: 'authenticationSvc',
          auth: function(authenticationSvc) {
            return authenticationSvc.authenticateCurrentUser();
          },
          recordsModel: 'recordsModel',
          recordsSvc: 'recordsSvc',
          contextSvc: 'contextSvc',
          entity: function($stateParams) {
            return $stateParams.entity;
          }
        },
        onEnter: function (recordsModel, entity) {
          recordsModel.reset(entity);
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
            controller: function ($scope, recordsModel) {
              $scope.model = recordsModel;

              $scope.selectScreen = function (screen) {
                $scope.model.selectScreen(screen);
              };
            }
          },
          context: {
            templateUrl: '/partials/records/context',
            controller: function ($scope, recordsModel, $state) {
              $scope.model = recordsModel;
              $scope.selectContext = function (context) {
                $scope.model.unwindContext(context);
                $state.go('records.list');
              };
              $scope.getContextName = function (context) {
                var name = context.name;
                if (context.record_ids.length > 1) {
                  name += ' (' + context.record_ids.length + ' records)';
                }
                return name;
              }
            }
          },
          records: {
            templateUrl: '/partials/records/multiple-records',
            controller: function ($scope, recordsModel, $state, formatSvc) {
              $scope.model = recordsModel;

              $scope.drillIntoRecord = function (recordId, displayName) {
                console.log('Context is...');
                console.log($scope.model.contexts);

                $scope.model.pushContext({
                  record_ids: [recordId],
                  name: displayName,
                  data: _.where($scope.model.activeView.data, { record_id: recordId })
                });
                };

              $scope.getFormattedValue = function (field, record) {
                return formatSvc.formatAsText(field, record, $scope.model.activeView.referenceData);
              };
            }
          }
        }
      })
      .state('records.list.single', {
        url: '/:recordId',
        views: {
          'records@records': {
            templateUrl: '/partials/records/single-record-view',
            controller: function ($scope, recordsModel, formatSvc, $state) {
              $scope.model = recordsModel;
              console.log($scope.model.activeView.data[0]);
              $scope.formData = {};

              $scope.editRecord = function () {
                $scope.model.setMode('edit');
                $state.go('.edit');
              };

              $scope.getFormattedValue = function (field, record) {
                return formatSvc.formatAsText(field, record, $scope.model.activeView.referenceData);
              };

            }
          }
        }
      })
      .state('records.list.single.edit', {
        url: '/edit',
        views: {
          'records@records': {
            templateUrl: '/partials/records/single-record-edit',
            controller: function ($scope, recordsModel, formatSvc, recordsSvc, $state, $stateParams) {
              $scope.model = recordsModel;

              $scope.singleTemplate = $scope.model.activeView.getEditTemplate();
              $scope.formData = {};

              $scope.cancelEditRecord = function () {
                $scope.model.setMode('view');
                $state.go('^');
              };

              $scope.saveRecord = function () {
                recordsSvc.setDataForScreen(
                  $scope.model.entity,
                  $scope.model.activeView.screen.name,
                  $scope.model.activeView.data[0].record_id,
                  $scope.formData)
                  .then(function() {
                    return $scope.model.buildActiveView();
                  })
                  .then(function() {
                    $scope.model.setMode('view');
                    $state.go('^');
                  });
              };

              $scope.getFormattedValue = function (field, record) {
                return formatSvc.formatAsText(field, record, $scope.model.activeView.referenceData);
              };

            }
          }
        }
      });
  });
