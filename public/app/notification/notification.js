angular.module('notification', [])
  .value('notifier', toastr)
  .factory('notifierSvc', function (notifier) {
    return {
      success: function (msg) {
        notifier.success(msg);
      },
      warning: function (msg) {
        notifier.warning(msg);
      },
      error: function (msg) {
        notifier.error(msg);
      }
    };
  });