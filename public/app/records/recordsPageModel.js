angular.module('app').service('recordsPageModel', function(screensSvc, contextSvc, $parse, employeeSvc) {

  this.screens = null;
  this.activeScreen = null;
  this.context = null;
  this.activeContext = null;
  this.mode = 'view';
  this.multipleTemplate = {};
  this.singleTemplate = {};

  this.reset = function() {
    var self = this;
    this.screens = null;
    this.activeScreen = null;
    this.contexts = null;
    this.activeContext = null;
    this.mode = 'view';
    this.multipleTemplate = {};
    this.singleTemplate = {};

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
          var setter = $parse(key).assign;
          setter(employee, value);
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

  function refreshTemplates(ref) {
    var view = ref.activeContext.data.length === 1 ? 'single' : 'multiple';
    screensSvc.data(ref.activeScreen.name, view)
      .then(function(data) {
        if (view === 'multiple') {
          ref.multipleTemplate = data;
          ref.singleTemplate = {};
        } else { // 'single'
          if (data.length === 1) {
            ref.singleTemplate = transformSingleTemplate(ref, data[0].data);
            ref.multipleTemplate = {};
          }
        }
      });
  }

  function transformSingleTemplate(ref, fields) {
    return _.reduce(fields, function(result, field) {
      result[field.source] = {
        type: field.type || 'readonly',
        label: field.label,
        val: field.value
      };
      return result;
    }, {});
  }
});