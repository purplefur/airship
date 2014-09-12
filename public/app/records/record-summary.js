angular.module('records').directive('recordSummary', function(recordSvc, $rootScope) {
  return {
    restrict: 'E',
    templateUrl: '/partials/records/record-summary',
    controller: function ($scope, recordsModel) {

      $scope.model = recordsModel;
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
          department: record.job.department,
          reportsTo: record.job.reportsTo,
          los: {
            years: Math.floor(losMonths / 12),
            months: losMonths % 12
          }
        };
      }
    }
  };
});