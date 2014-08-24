define(["get-user-media"], function(getUserMedia){

  var Microphone = function(){
    this.initialize.apply(this, arguments);
  };

  Microphone.prototype = {
    initialize: function(context){
      var self = this;
      this._gain = context.createGain();
      getUserMedia({audio: true}).then(function(stream){
        self._source = context.createMediaStreamSource(stream);
        self._source.connect(self._gain);
      }, function(err){
        console.log(err);
      });
    },
    connect: function(node){
      this._gain.connect(node);
    },
    disconnect: function(){
      this._gain.disconnect();
    },
    enable: function(){
      this._gain.gain.value = 1.5;
    },
    disable: function(){
      this._gain.gain.value = 0;
    }
  };

  return Microphone;
});
