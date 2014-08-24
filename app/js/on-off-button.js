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

  var onPressed = function(onElm, offElm){
    onElm.disabled = true;
    offElm.disabled = false;
    hideElement(onElm);
    showElement(offElm);
  };

  var offPressed = function(onElm, offElm){
    offElm.disabled = true;
    onElm.disabled = false;
    hideElement(offElm);
    showElement(onElm);
  };

  OnOffButton.prototype = {
    initialize: function(onElm, offElm){
      this._onElm = onElm;
      this._offElm = offElm;
      offPressed(onElm, offElm);
      
      onElm.addEventListener("click", function(){
        onPressed(onElm, offElm);
      });
      offElm.addEventListener("click", function(){
        offPressed(onElm, offElm);
      });
    },
    addEventListener: function(type, func){
      if(type == "on"){
        this._onElm.addEventListener("click", func);
      }else if(type == "off"){
        this._offElm.addEventListener("click", func);
      }
    }
  };

  return OnOffButton;
});
