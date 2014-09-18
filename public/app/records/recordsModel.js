angular.module('records').service('recordsModel', function(entitySvc, contextSvc, recordsSvc, referenceDataSvc, $parse, $q, $state) {

  this.screens = [];
  this.contexts = [];
  this.activeView = {};
  this.mode = 'view';
  this.entity = null;

  this.reset = function(entity) {
    var self = this;
    this.screens = [];
    this.contexts = [];
    this.activeView = {};
    this.mode = 'view';
    this.entity = entity;

    entitySvc.getScreens(this.entity)
      .then(function(res) {
        self.screens = res.data;
      })
      .then(function() {
        return contextSvc.getContext(self.entity);
      })
      .then(function(res) {
        self.contexts.push(res.data);
      })
      .then(function() {
        self.buildActiveView(_.first(self.screens));
      });
  };

  this.buildActiveView = function(screen) {
    if (screen === undefined) {
      screen = this.activeView.screen;
    }

    var newActiveView = {
      getEditTemplate: function() {
        var self = this;
        return _.reduce(self.screen.layout, function(result, field) {
          result[field.name] = {
            type: field.type || 'readonly',
            label: field.label,
            value: self.data[0].data[field.name],
            referenceData: field.type === 'ref_data' ? self.referenceData[field.ref_data_id] : null
          };
          return result;
        }, {});
      },
      screen: screen,
      referenceData: null,
      data: null
    };

    var defer = $q.defer();
    var self = this;
    this.setMode('view'); // always drop back to view mode when switching screens

    // Get the layout for this screen...
    entitySvc.getScreen(this.entity, newActiveView.screen.name)
      .then(function(result) {
        newActiveView.screen.layout = result.data;
        // ...then load its reference data
        return loadReferenceData(newActiveView.screen.layout);
      })
      .then(function(result) {
        newActiveView.referenceData = result;
        // ...then get the data for this screen, based on the context held against the account
        return recordsSvc.getDataForScreen(self.entity, screen.name)
      })
      .then(function(result) {
        // ..then filter the results based on the current context
        newActiveView.data = _.where(result.data, function(record) {
          return _.contains(_.last(self.contexts).record_ids, record.record_id);
        });

        // store the data and resolve the promise
        self.activeView = newActiveView;
        defer.resolve(self.activeView);
      });

    return defer.promise;
  };

  this.setMode = function(mode) {
    this.mode = mode;
  };

  this.selectScreen = function(screen) {
    this.buildActiveView(screen);
  };

  this.pushContext = function(context) {
    this.contexts.push(context);
    this.buildActiveView()
      .then(function(result) {
        if (result.data.length <= 1) {
          $state.go('.single', {recordId: result.data[0].record_id});
        }
      });
  };

  this.unwindContext = function() {
    this.contexts.pop();
    this.buildActiveView()
    .then(function(result) {
      if (result.data.length > 1) {
        $state.go('records.list');
      }
    });
  };

  this.saveSingleTemplateData = function(formData) {
    var self = this;
    employeeSvc.findById(formData._id)
      .then(function(employee) {
        _.forIn(formData, function(value, key) {
          applyFormFieldToRecord(value, key, employee);
        });
        return employee;
      })
      .then(function(employee) {
        employeeSvc.update(employee)
        .then(function() {
            self.setMode('view');
            getData(self);
          });
      });
  };

  function applyFormFieldToRecord(value, key, record) {
    var setter = $parse(key).assign;
    setter(record, value);
  }

  function loadReferenceData(layout) {
    var defer = $q.defer();
    var referenceData = {};
    var refDataToLoad = [];

    // then load each set of reference data, fulfilling the promise when there are no more to load
    if (_.any(layout, { type: 'ref_data'})) {
      _.forEach(_.where(layout, { type: 'ref_data'}), function (refDataField) {
        refDataToLoad.push(refDataField.id);
        referenceDataSvc.getReferenceDataWithId(refDataField.ref_data_id)
          .then(function (refData) {
            referenceData[refDataField.ref_data_id] = refData.data.referencedata;
            _.remove(refDataToLoad, function (field) {
              return field === refDataField.id;
            });
            if (refDataToLoad.length === 0) {
              defer.resolve(referenceData);
            }
          });
      });
    }
    else {
      defer.resolve(referenceData);
    }

    return defer.promise;
  }
});