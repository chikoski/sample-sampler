define([], function(){

  var Filter = function(){
    this.initialize.apply(this, arguments);
  };

  Filter.prototype = {
    maxGain: 2.0,
    maxFrequency: 22050.0,
    maxQ: 30.0,
    initialize: function(context){
      this.output = context.createGain();
      this.destination = context.createBiquadFilter();
      this.destination.type = "allpass";
      this.destination.connect(this.output);
    },
    normalize: function(value){
      return Math.max(0, Math.min(value, 1.0));
    },
    connect: function(node){
      this.output.connect(node);
    },
    disconnect: function(){
      this.output.disconnect();
    },
    get gain(){
      return this.output.gain.value;
    },
    set gain(value){
      this.output.gain.value = Math.max(0, Math.min(value, this.maxGain));
    },
    get x(){
      return this.destination.frequency.value;
    },
    set x(value){
      this.destination.frequency.value = Math.floor(this.normalize(value) * this.maxFrequency);
    },
    get y(){
      return this.destination.Q.value;
    },
    set y(value){
      this.destination.Q.value = Math.floor(this.normalize(value) * this.maxQ);
    },
    mute: function(){
      this.gain = 0;
    },
    enable: function(){
      this.gain = this.output.gain.defaultValue;
    },
    disable: function(){
      this.mute();
    }
  };

  return Filter;
  
});
