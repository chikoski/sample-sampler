define(["parts/filter/passthrough"], function(PassThrough){

  var CenterCancel = function(){
    this.initialize.apply(this, arguments);
  };

  CenterCancel.prototype = PassThrough.prototype;
  CenterCancel.prototype.constructor = CenterCancel;
  CenterCancel.prototype.initialize = function(context){
    this.output = context.createGain();
    this.destination = context.createBiquadFilter();
    this.destination.type = "notch";
    this.destination.connect(this.output);
  };

  return CenterCancel;
  
});
