define(["parts/filter/passthrough"], function(PassThrough){

  var HighShelf = function(){
    this.initialize.apply(this, arguments);
  };

  HighShelf.prototype = Object.create(PassThrough.prototype);
  HighShelf.prototype.constructor = HighShelf;
  HighShelf.prototype.maxFrequency = 9000;
  HighShelf.prototype.initialize = function(context){
    this.output = context.createGain();
    this.destination = context.createBiquadFilter();
    this.destination.type = "highshelf";
    this.destination.connect(this.output);
  };

  return HighShelf;
  
});
