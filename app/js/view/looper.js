define(["view/on-off-button"], function(OnOffButton){

  var Looper = function(){
    this.initialize.apply(this, arguments);
  };

  Looper.prototype = {
    initialize: function(conf){
      this.looper = conf.looper;
      this.recordButton = new OnOffButton(conf.recordButton);

      this.recordButton.addEventListener("on", function(event){
        this.looper.startRecording();
        console.log("start recording");
      }.bind(this));
      this.recordButton.addEventListener("off", function(event){
        this.looper.stopRecording();
        console.log("stop recording");
      }.bind(this));
    }
  };

  return Looper;
});
