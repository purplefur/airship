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
            }
          },
          records: {
            templateUrl: '/partials/records/multiple-records',
            controller: function ($scope, recordsModel, $state) {
              $scope.model = recordsModel;
              $scope.drillIntoRecord = function (recordId, displayName) {
                $scope.model.pushContext({
                  label: displayName,
                  data: [
                    { _id: recordId }
                  ]
                });
                $state.transitionTo('records.list.single', { recordId: recordId });
              };
              $scope.parseValue = function (field) {
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
          'records@records': {
            templateUrl: '/partials/records/single-record',
            controller: function ($scope, recordsModel, recordsSvc) {
              $scope.model = recordsModel;
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
                    recordsSvc.findById(data[0]._id)
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
  });
