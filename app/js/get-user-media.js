define([], function(){

  navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia;
  var Promise = window.Promise;

  var normalize = function(constraint){
    for(var key in constraint){
      if(typeof constraint[key] !== "boolean"){
        constraint[key] = false;
      }
    }
    return constraint;
  };

  var getUserMedia = function(constraint){
    return new Promise(function(resolve, reject){
      navigator.getUserMedia(normalize(constraint), function(stream){
        resolve(stream);
        window.addEventListener("beforeunload", function(event){
          stream.stop();
        });
      },function(error){
        reject(error);
      });
    });
  };

  return getUserMedia;
});
