define([], function(){

  var Visualizer = function(){
    this.initialize.apply(this, arguments);
  };

  var scale = function(value, min, max, toMin, toMax){
    return (value - min) / max * (toMax - toMin) + toMin;
  };

  var position = function(index){
    return {
      x: scale(index, 0, this.data.length, 0, this.canvas.width),
      y: this.canvas.height - scale(this.data[index], 0, 255, 0, this.canvas.height)
    };
  };

  var fadeOut = function(){
    this.gc.fillStyle = "rgba(255, 255, 255, .2)";
    this.gc.fillRect(0, 0, this.canvas.width, this.canvas.height);
  };

  var update = function(){
    this.analyser.getByteFrequencyData(this.data);
    fadeOut.call(this);
    this.gc.beginPath();
    for(var i = 0; i < this.data.length; i++){
      var pos = position.call(this, i);
      if(i == 0){
        this.gc.moveTo(pos.x, pos.y);
      }else{
        this.gc.lineTo(pos.x, pos.y);
      }
    }
    this.gc.stroke();
    window.requestAnimationFrame(this.update);
  };

  Visualizer.prototype = {
    initialize: function(conf){
      this.canvas = conf.canvas;
      this.gc = this.canvas.getContext("2d");
      this.analyser = conf.analyser;
      this.data = new Uint8Array(this.analyser.frequencyBinCount);
      this.update = update.bind(this);
    },
    start: function(){
      this.update();
    }
  };

  return Visualizer;
});
