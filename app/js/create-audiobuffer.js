define([], function(){

  var reader = new FileReader();

  return function(blob, context){
    return new Promise(function(resolve, fail){
      reader.onload = function(event){
        context.decodeAudioData(event.target.result, resolve);
      };
      reader.readAsArrayBuffer(blob);
    });
  };
  
});
