define(["view/on-off-button"], function(OnOffButton){

  var MicButton = function(){
    this.initialize.apply(this, arguments);
  };

  MicButton.prototype = {
    initialize: function(config){
      this.mic = config.mic;
      this.el = new OnOffButton(config.el);

      this.el.addEventListener("on", function(){
        console.log("Enable the microphone");
        this.mic.enable();
      }.bind(this));
      this.el.addEventListener("off", function(){
        console.log("Disable the microphone");
        this.mic.disable();
      }.bind(this));
    }
  };

  return MicButton;
});
