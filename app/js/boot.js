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
    },
    onsenui: {
      deps: ['angular'],
      exports: 'ons'
    }
  }
});

window.require(["microphone", "looper", "create-audiobuffer", "on-off-button"], function(Microphone, Looper, createAudioBuffer, OnOffButton){

  var library = [];

  var context =  new AudioContext();
  var bufferedSource = context.createBufferSource();
  bufferedSource.loop = true;
  var mic = new Microphone(context);
  mic.disable();
  var looper = new Looper(context);

  mic.connect(looper.destination);
  bufferedSource.connect(looper.destination);

  mic.connect(context.destination);
  bufferedSource.connect(context.destination);

  var updateListView = function(list, elm, renderer){
    for(var i = elm.childElementCount; i < list.length; i++){
      elm.appendChild(renderer(list[i]));
    }
  };

  var renderSample = function(sample){
    var el = document.createElement("li");
    el.textContent = (new Date(sample.timeStamp)).toLocaleString();
    el.addEventListener("click", function(event){
      playFile(sample.data);
    });
    return el;
  };
  
  var play = function(buffer){
    bufferedSource.buffer = buffer;
    bufferedSource.start(0);
  };

  var playFile = function(file){
    createAudioBuffer(file, context).then(play, console.log);
  };

  var addFile = function(item){
    library.push(item);
  };

  var addFiles = function(array){
    for(var i = 0; i < array.length; i++){
      addFile(array[i]);
    }
  };

  var labelOfFile = function(file){
    var el = document.createElement("div");
    el.className = "item-inner";
    el.textContent = file.name;
    return el;
  };

  var renderFile = function(file){
    var el = document.createElement("li");
    el.appendChild(labelOfFile(file));
    el.addEventListener("click", function(){
      console.log("click");
      playFile(file);
    });
    el.className = "item-content";
    return el;
  };

  var deviceStorageAvailable = function(){
    return false;
  };

  var libraryView = document.querySelector("#library > ul");
  var updateLibraryView = function(){
    updateListView(library, libraryView, renderFile);
  };

  var fileInput = document.querySelector("#file");
  fileInput.addEventListener("change", function(event){
    var list = (event.target || {}).files || [];
    if(list != null && list.length > 0){
      addFiles(list);
      updateLibraryView();
    }
  });

  document.querySelector("#reload").addEventListener("click", function(event){
    event.preventDefault();
    if(deviceStorageAvailable()){
    }else{
      fileInput.click();
    }
  });

  var recordingButton = new OnOffButton(document.querySelector("#start-recording"),
                                        document.querySelector("#stop-recording"));
  recordingButton.addEventListener("on", function(event){
    looper.startRecording();
    console.log("start recording");
  });
  recordingButton.addEventListener("off", function(event){
    looper.stopRecording();
    console.log("stop recording");
  });

  var micButton = new OnOffButton(document.querySelector("#start-microphone"),
                                  document.querySelector("#stop-microphone"));
  micButton.addEventListener("on", function(){
    console.log("Enable the microphone");
    mic.enable();
  });
  micButton.addEventListener("off", function(){
    console.log("Disable the microphone");
    mic.disable();
  });

  var myApp = new Framework7();
});
