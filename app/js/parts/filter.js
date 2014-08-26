define([
  "parts/filter/passthrough",
  "parts/filter/lowpass",
  "parts/filter/highpass"
], function(
  PassThroughFilter,
  LowPassFilter,
  HighPassFilter
){

  var Filter = function(){
    this.initialize.apply(this, arguments);
  };

  var filters = [
      "pass through",
      "low pass",
      "high pass",
      "center cancel",
      "noise",
      "pitch shifter"
  ];

  var createPassThroughFilter = function(context){
    return new PassThroughFilter(context);
  };
  var createLowPassFilter = function(context){
    return new LowPassFilter(context);
  };
  var createHighPassFilter = function(context){
    return new HighPassFilter(context);
  };
  var createCenterCancelFilter = function(context){
  };
  var createNoiseFilter = function(context){

  };
  var createPitchShifter = function(context){
  };
  
  var createFilter = function(self, name, context){
    switch(name){
    case "pass through": return createPassThroughFilter(context);
    case "low pass": return createLowPassFilter(context);
    case "high pass": return createHighPassFilter(context);
    case "center cancel": return createCenterCancelFilter(context);
    case "noise": return createNoiseFilter(context);
    case "pitch shifter": return createPitchShifter(context);
    }
    return null;
  };

  var initFilter = function(name){
    var filter = createFilter(this, name, this.context);
    if(filter != null){
      this._filters[name] = filter;
      this.destination.connect(filter.destination);
      filter.connect(this.output);
    }
  };

  var mute =function(filter){
    filter.mute();
  };

  Filter.prototype = {
    initialize: function(context){
      this.context = context;
      this.destination = this.context.createGain();
      this.output = this.context.createGain();
      this._filters = {};
      filters.forEach(initFilter.bind(this));
      this.choose("pass through");
    },
    connect: function(node){
      this.output.connect(node);
    },
    disconnect: function(){
      this.output.disconnect();
    },
    choose: function(name){
      var chosen = this._filters[name] || this.passthrough;
      this.muteAll();
      chosen.enable();
    },
    muteAll: function(){
      for(var key in this._filters){
        mute(this._filters[key]);
      }
    },
    get passthrough(){
      return this._filters["pass through"];
    },
    get list(){
      return Object.keys(this._filters);
    }
  };

  return Filter;

});
