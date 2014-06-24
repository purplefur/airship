angular.module('app').service('recordsPageModel', function(screensSvc, contextSvc) {

  this.screens = null;
  this.activeScreen = null;
  this.context = null;
  this.activeContext = null;
  this.multipleTemplate = {};
  this.singleTemplate = {};

  this.reset = function() {
    var self = this;
    this.screens = null;
    this.activeScreen = null;
    this.contexts = null;
    this.activeContext = null;
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

  this.selectScreen = function(screen) {
    this.activeScreen = screen;
    if (this.activeContext !== null) {
      refreshTemplates(this);
    }
  };

  this.setActiveContext = function() {
    this.activeContext = _.last(this.contexts);
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

  function refreshTemplates(ref) {
    var view = ref.activeContext.data.length === 1 ? 'single' : 'multiple';
    screensSvc.data(ref.activeScreen.name, view)
      .then(function(data) {
        if (view === 'multiple') {
          ref.multipleTemplate = data;
          ref.singleTemplate = {};
        } else { // 'single'
          if (data.length === 1) {
            ref.singleTemplate = _.reduce(data[0].data, function(result, field) {
              result[field.source] = {
                type: field.type || 'readonly',
                label: field.label,
                val: field.value
              };
              return result;
            }, {});
            ref.multipleTemplate = {};
          }
        }
      });
  }
});