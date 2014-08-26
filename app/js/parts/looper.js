define(["create-audiobuffer"], function(createAudioBuffer){

  var Looper = function(){
    this.initialize.apply(this, arguments);
  };

  Looper.prototype= {
    initialize: function(context){
      this._context = context;
      
      this.destination = context.createMediaStreamDestination();
      this._recorder = new MediaRecorder(this.destination.stream);

      var self = this;
      var setAudioBuffer = function(buffer){
        self._source.buffer = buffer;
      };

      this._recorder.ondataavailable = function(event){
        createAudioBuffer(event.data, context).then(setAudioBuffer, console.log);
      };
      
      this._source = context.createBufferSource();
      this._source.loop = true;
      this._source.connect(this.destination);
    },
    connect: function(node){
      this._source.connect(node);
    },
    disconnect: function(){
      this._source.disconnect();
      this.source.connect(this.destination);
    },
    startRecording: function(){
      this._recorder.start();
    },
    stopRecording: function(){
      this._recorder.stop();
    },
    play: function(){
      this._source.start(0);
    },
    stop: function(){
      this._source.stop();
    }
  };

  return Looper;
});
