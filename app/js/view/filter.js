define([], function(){

  var Filter = function(){
    this.initialize.apply(this, arguments);
  };

  var toActionList = function(name){
    return {text: name};
  };

  Filter.prototype = {
    initialize: function(conf){
      this.filter = conf.filter;
      this.actionListController = conf.actionListController;
      this.changeButton = conf.changeButton;
      this.pad = conf.pad;

      this.list = this.filter.list.map(toActionList.bind(this));

      this.changeButton.addEventListener("click", function(){
        this.actionListController.actions(this.list);
      }.bind(this));
    }
  };

  return Filter;
  
});
