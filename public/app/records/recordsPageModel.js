angular.module('app').service('recordsPageModel', function(screensSvc, contextSvc, $parse, employeeSvc, $q, referenceDataSvc) {

  this.screens = null;
  this.activeScreen = null;
  this.context = null;
  this.activeContext = null;
  this.mode = 'view';
  this.multipleTemplate = {};
  this.singleTemplate = {};
  this.referenceData = [];

  this.reset = function() {
    var self = this;
    this.screens = null;
    this.activeScreen = null;
    this.contexts = null;
    this.activeContext = null;
    this.mode = 'view';
    this.multipleTemplate = {};
    this.singleTemplate = {};
    this.referenceData = [];

    screensSvc.all()
      .then(function(data) {
        self.screens = data;
        self.selectScreen(_.first(data));
      });

    contextSvc.getContexts()
      .then(function(data) {
        self.contexts = data;
        self.setActiveContext();
      });
  };

  this.setMode = function(mode) {
    this.mode = mode;
  };

  this.selectScreen = function(screen) {
    this.activeScreen = screen;
    this. setMode('view'); // always drop back to view mode when switching screens
    if (this.activeContext !== null) {
      refreshTemplates(this);
    }
  };

  this.setActiveContext = function() {
    this.activeContext = _.last(this.contexts);
    this.setMode('view'); // always drop back to view mode when switching context
    if (this.activeScreen !== null) {
      refreshTemplates(this);
    }
  };

  this.pushContext = function(context) {
    var self = this;
    contextSvc.pushContext(context)
      .then(function(contexts) {
        self.contexts = contexts;
        self.setActiveContext();
      });
  };

  this.unwindContext = function(context) {
    var self = this;
    contextSvc.unwindContext(context)
      .then(function(contexts) {
        self.contexts = contexts;
        self.setActiveContext();
    });
  };

  this.saveSingleTemplateData = function(formData) {
    var self = this;
    employeeSvc.findById(formData["_id"])
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
            refreshTemplates(self);
        });
      });
  };

  function applyFormFieldToRecord(value, key, record) {
    var setter = $parse(key).assign;
    setter(record, value);
  }

  function refreshTemplates(self) {
    var view = self.activeContext.data.length === 1 ? 'single' : 'multiple';
    screensSvc.data(self.activeScreen.name, view)
      .then(function(data) {
        console.log(data);
        if (view === 'multiple') {
          self.multipleTemplate = data;
          self.singleTemplate = {};
        }
        else { // 'single'
          if (data.length === 1) {
            self.singleTemplate = transformSingleTemplate(data);
            self.multipleTemplate = {};
          }
          // TODO: Handle missing data
        }
      })
      .then(function() {
        var allPromises = [];
        _.compact(_.pluck(self.singleTemplate, 'referenceData')).forEach(function(element) {
          var deferred = $q.defer();
          referenceDataSvc.get(element).then(function(result) {
            deferred.resolve({ name: result.name, data: result.data });
          });
          allPromises.push(deferred.promise);
        });
        return $q.all(allPromises);
      })
      .then(function(referenceData) {
        self.referenceData = referenceData;
      });
  }

  function transformSingleTemplate(data) {
    var fields = data[0].data;
    var template = _.reduce(fields, function(result, field) {
      console.log(field);
      result[field.source] = {
        type: field.type || 'readonly',
        label: field.label,
        value: field.value,
        referenceData: field.referenceData
      };
      return result;
    }, {});

    template._id = {
      type: 'hidden',
      value: data[0]._id
    };
    return template;
  }
});