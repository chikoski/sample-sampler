define(["parts/filter/passthrough"], function(PassThrough){

  var LowPass = function(){
    this.initialize.apply(this, arguments);
  };

  LowPass.prototype = Object.create(PassThrough.prototype);
  LowPass.prototype.constructor = LowPass;
  LowPass.prototype.maxFrequency = 3000;
  LowPass.prototype.initialize = function(context){
    this.output = context.createGain();
    this.destination = context.createBiquadFilter();
    this.destination.type = "lowpass";
    this.destination.connect(this.output);
  };

  return LowPass;
  
});
