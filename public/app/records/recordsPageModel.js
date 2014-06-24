angular.module('app').service('recordsPageModel', function(screensSvc) {

  this.activeScreen = null;
  this.activeContext = null;
  this.displayData = null;

  this.reset = function() {
    this.activeScreen = null;
    this.activeContext = null;
    this.displayData = null;
  }

  this.selectScreen = function(screen) {
    this.activeScreen = screen;
    if (this.activeContext !== null) {
      getDisplayData(this);
    }
  }

  this.setContext = function(context) {
    this.activeContext = context;
    if (this.activeScreen !== null) {
      getDisplayData(this);
    }
  }

  function getDisplayData(ref) {
    screensSvc.data(ref.activeScreen.name, ref.activeContext.length === 1 ? 'full' : 'summary')
      .then(function(data) {
        ref.displayData = data;
      });
  }
});