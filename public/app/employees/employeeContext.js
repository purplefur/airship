angular.module('app').factory('employeeContext', function($q, employees, users, mvIdentity) {

  function employeeContext(label, data) {
    this.label = label;
    this.data = data;
  }

  return {
    contexts: [],

    loadInitialContext: function() {
      var self = this;
      var deferred = $q.defer();

      users.withId(mvIdentity.currentUser._id)
        .then(function(user) {
          if (user.contexts.length > 0) {
            self.contexts.push(user.contexts[0]);
            deferred.resolve();
          } else {
            // Load all employees by default
            employees.all().then(function (data) {
              self.contexts.push(
                new employeeContext('All records', data)
              );
              deferred.resolve();
            });
          }
        });

      return deferred.promise;
    },

    getCurrentContext: function() {
      return _.last(this.contexts);
    }
 };

//  return {
//    self: this,
//    employeeContexts: [],
//
//    loadInitialContext: function(searchText) {
//      console.log(self);
//      var deferred = $q.defer();
//
//      if (searchText !== undefined && searchText.length > 0) {
//        // We have search criteria supplied on the query string so use this as our initial context
//        employees.search(searchText).then(function (data) {
//          self.employeeContexts.push(
//            new employeeContext('Search results for \'' + searchText + '\'', data)
//          );
//          deferred.resolve();
//        });
//      } else {
//        // Load all employees by default
//        employees.all().then(function (data) {
//          self.employeeContexts.push(
//            new employeeContext('All records', data)
//          );
//          deferred.resolve();
//        });
//      }
//
//      return deferred.promise;
//    },
//
//    pushContext: function(label, data) {
//      self.employeeContexts.push(new employeeContext(label, data));
//    },
//
//    popContext: function() {
//      self.employeeContexts.pop();
//    },
//
//    switchContext: function (context) {
//      while (self.employeeContexts.length > 0) {
//        var lastContext = _.last(self.employeeContexts);
//        if (context.label !== lastContext.label) {
//          self.popContext();
//        } else {
//          break;
//        }
//      }
//    }
//  };
});