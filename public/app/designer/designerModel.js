angular.module('app').service('designerModel', function() {
  this.entity = null;

  this.setEntity = function(entity) {
    this.entity = entity;
  };
});