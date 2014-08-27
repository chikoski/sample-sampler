define(["parts/filter/passthrough"], function(PassThrough){

  var HighPass = function(){
    this.initialize.apply(this, arguments);
  };

  HighPass.prototype = Object.create(PassThrough.prototype);
  HighPass.prototype.constructor = HighPass;
  HighPass.prototype.initialize = function(context){
    this.output = context.createGain();
    this.destination = context.createBiquadFilter();
    this.destination.type = "highpass";
    this.destination.connect(this.output);
  };

  return HighPass;
  
});
