define([
  "parts/filter/passthrough",
  "parts/filter/lowpass",
  "parts/filter/highpass",
  "parts/filter/center-cancel"
], function(
  PassThroughFilter,
  LowPassFilter,
  HighPassFilter,
  CenterCancelFilter
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
    return new CenterCancelFilter(context);
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
      this.enabledFilter = this._filters[name] || this.passthrough;
      this.muteAll();
      this.enabledFilter.enable();
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
    },
    get x(){
      return this.enabledFilter.x;
    },
    set x(value){
      this.enabledFilter.x = value;
    },
    get y(){
      return this.enabledFilter.y;
    },
    set y(value){
      this.enabledFilter.y = value;
    }
  };

  return Filter;

});
