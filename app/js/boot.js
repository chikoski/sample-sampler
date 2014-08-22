window.require.config({
  baseUrl: 'js/',
  paths: {
    underscore: '../components/underscore/underscore-min',
    backbone: '../components/backbone/backbone-min',
    handlebars: '../components/handlebars.js/dist/handlebars.runtime',
    jquery: '../components/jquery/dist/jquery'
  },
  shim: {
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    underscore: {
      exports: '_'
    },
    handlebars: {
      exports: 'Handlebars'
    },
    jquery: {
      exports: '$'
    }
  }
});

window.require([], function(){

  var samples = [];
  var library = [];

  var context =  new AudioContext();
  var bufferedSource = context.createBufferSource();
  bufferedSource.loop = true;
  bufferedSource.connect(context.destination);

  var dest = context.createMediaStreamDestination();
  var recorder = new MediaRecorder(dest.stream);
  bufferedSource.connect(dest);

  var updateListView = function(list, elm, renderer){
    for(var i = elm.childElementCount; i < list.length; i++){
      elm.appendChild(renderer(list[i]));
    }
  };

  var sampleView = document.querySelector("#samples > ul");

  var renderSample = function(sample){
    var el = document.createElement("li");
    el.textContent = (new Date(sample.timeStamp)).toLocaleString();
    el.addEventListener("click", function(event){
      playFile(sample.data);
    });
    return el;
  };
  
  var updateSampleView = function(){
    updateListView(samples, sampleView, renderSample);
  };

  recorder.ondataavailable = function(event){
    console.log(event);
    samples.push({timeStamp: event.timeStamp, data: event.data});
    updateSampleView();
  };
  
  var createAudioBuffer = function(file){
    return new Promise(function(resolve, fail){
      console.log("start buffer creation");
      var reader = new FileReader();
      reader.onload = function(event){
        context.decodeAudioData(event.target.result, resolve);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  var play = function(buffer){
    bufferedSource.buffer = buffer;
    bufferedSource.start(0);
  };

  var playFile = function(file){
    createAudioBuffer(file).then(function(buffer){
      console.log("buffer created");
      play(buffer);
    }, function(error){
      console.log(error);
    });
  };

  var addFile = function(item){
    library.push(item);
  };

  var addFiles = function(array){
    for(var i = 0; i < array.length; i++){
      addFile(array[i]);
    }
  };

  var renderFile = function(file){
    var el = document.createElement("li");
    el.textContent = file.name;
    el.addEventListener("click", function(){
      console.log("click");
      playFile(file);
    });
    return el;
  };

  var libraryView = document.querySelector("#library > ul");
  var updateLibraryView = function(){
    updateListView(library, libraryView, renderFile);
  };

  document.querySelector("#file").addEventListener("change", function(event){
    var list = (event.target || {}).files;
    if(list != null && list.length > 0){
      addFiles(list);
      updateLibraryView();
    }
  });

  var startButton = document.querySelector("#start-recording");
  var stopButton = document.querySelector("#stop-recording");
  startButton.disabled = false;
  stopButton.disabled = true;

  startButton.addEventListener("click", function(event){
    startButton.disabled = true;
    stopButton.disabled = false;
    recorder.start();
    console.log("start recording");
  });

  stopButton.addEventListener("click", function(event){
    stopButton.disabled = true;
    startButton.disabled = false;
    recorder.stop();
    console.log("stop recording");
  });
  
});
