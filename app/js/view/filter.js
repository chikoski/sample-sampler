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
    return {x: normalize(event.clientX - event.target.offsetLeft, pad.clientWidth),
            y : 1.0 - normalize(event.clientY - event.target.offsetTop, pad.clientHeight)};          
  };

  var updateIndicater = function(x, y){
    this.indicaterX.textContent = this.filter.x;
    this.indicaterY.textContent = this.filter.y;
  };

  Filter.prototype = {
    initialize: function(conf){
      this.filter = conf.filter;
      this.actionListController = conf.actionListController;
      this.changeButton = conf.changeButton;
      this.pad = conf.pad;
      this.indicaterX = conf.indicaterX;
      this.indicaterY = conf.indicaterY;

      this.list = this.filter.list.map(toActionList.bind(this));

      updateIndicater.call(this);
      
      this.onPadTouched = function(event){
        if(event.buttons != 0){
          var pos = position(event, this.pad);
          this.filter.x = pos.x;
          this.filter.y = pos.y;
          updateIndicater.call(this);
          this.filter.enable();
        }else{
          this.filter.disable();
        }
      }.bind(this);

      this.changeButton.addEventListener("click", function(){
        this.actionListController.actions(this.list);
      }.bind(this));

      this.pad.addEventListener("mousemove", function(event){
        this.onPadTouched(event);
      }.bind(this));
      
    }
  };

  return Filter;
  
});
