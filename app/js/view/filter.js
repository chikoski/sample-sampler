define([], function(){

  var LABEL = {
    text: "Filters",
    label: true
  };

  var Filter = function(){
    this.initialize.apply(this, arguments);
  };

  var createActionListHandler = function(name){
    return function(){
      this.filter.choose(name);
      console.log("Filter changed: "+ name);
    }.bind(this);
  };

  var toActionList = function(name){
    return {
      text: name,
      onClick: createActionListHandler.call(this, name)
    };
  };

  var normalize = function(value, max){
    return Math.min(1.0, value / max);
  };

  var position = function(event, pad){
    return {x: normalize(event.clientX, pad.clientWidth),
            y : 1.0 - normalize(event.clientY, pad.clientHeight)};          
  };

  Filter.prototype = {
    initialize: function(conf){
      this.filter = conf.filter;
      this.actionListController = conf.actionListController;
      this.changeButton = conf.changeButton;
      this.pad = conf.pad;

      this.list = this.filter.list.map(toActionList.bind(this));
      this.onPadTouched = function(event){
        if(event.buttons != 0){

        }
      }.bind(this);

      this.changeButton.addEventListener("click", function(){
        this.actionListController.actions(this.list);
      }.bind(this));
      
    }
  };

  return Filter;
  
});
