define(["parts/filter/passthrough"], function(PassThrough){

  var Lowshelf = function(){
    this.initialize.apply(this, arguments);
  };

  Lowshelf.prototype = Object.create(PassThrough.prototype);
  Lowshelf.prototype.constructor = Lowshelf;
  Lowshelf.prototype.maxFrequency = 3000;
  Lowshelf.prototype.initialize = function(context){
    this.output = context.createGain();
    this.destination = context.createBiquadFilter();
    this.destination.type = "lowshelf";
    this.destination.connect(this.output);
  };

  return Lowshelf;
  
});
