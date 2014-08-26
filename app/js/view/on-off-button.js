define([], function(){

  var OnOffButton = function(){
    this.initialize.apply(this, arguments);
  };

  var hideElement = function(elm){
    elm.classList.add("hidden");
  };

  var showElement = function(elm){
    elm.classList.remove("hidden");
  };

  var notify = function(func){
    func();
  };

  var notifyAll = function(array){
    array.forEach(notify);
  };

  var onPressed = function(self){
    self.el.classList.add("active");
    notifyAll(self.handlers.on);
  };

  var offPressed = function(self){
    self.el.classList.remove("active");
    notifyAll(self.handlers.off);
  };

  OnOffButton.prototype = {
    initialize: function(el){
      this.el = el;
      this.handlers = {
        on: [],
        off: []
      };
      this._pressed = false;
      el.addEventListener("click", function(){
        if(this._pressed){
          offPressed(this);
        }else{
          onPressed(this);
        }
        this._pressed = !this._pressed;
      }.bind(this));
    },
    addEventListener: function(type, func){
      if(type == "on"){
        this.handlers.on.push(func);
      }else if(type == "off"){
        this.handlers.off.push(func);
      }
    }
  };

  return OnOffButton;
});
