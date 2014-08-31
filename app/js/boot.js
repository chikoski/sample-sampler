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

window.require(["parts", "create-audiobuffer", "view"], function(Parts, createAudioBuffer, View){

  var myApp = new Framework7();
  
  var library = [];

  var context =  new AudioContext();
  var bufferedSource = context.createBufferSource();
  bufferedSource.loop = true;
  var mic = new Parts.Microphone(context);
  mic.disable();
  var looper = new Parts.Looper({context: context,
                                 tracks: 4
                                });
  var filter = new Parts.Filter(context);

  var outputGain = context.createGain();
  var analyser = context.createAnalyser();
  
  mic.connect(filter.destination);
  bufferedSource.connect(filter.destination);

  filter.connect(looper.destination);
  looper.connect(filter.destination);
  filter.connect(outputGain);

  outputGain.connect(context.destination);
  outputGain.connect(analyser);

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
    console.log("play buffer");
    bufferedSource.buffer = buffer;
    bufferedSource.start(0);
  };

  var playFile = function(file){
    console.log(file.name || "looper");
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
      playFile(file);
    });
    el.className = "item-content";
    return el;
  };

  var deviceStorageAvailable = function(){
    return navigator != null && navigator.getDeviceStorage != null;
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

  var loadMusicFromDeviceStorage = function(){
    var storage = navigator.getDeviceStorage('music');
    var enm = storage.enumerate();
    enm.onsuccess = function(){
      console.log(this);
      library.push(this.result);
      if(!this.done){
        this.continue();
      }else{
        updateLibraryView();
      }
    };
  };

  document.querySelector("#reload").addEventListener("click", function(event){
    event.preventDefault();
    if(deviceStorageAvailable()){
      console.log("device storage is avialable");
      loadMusicFromDeviceStorage();
    }else{
      console.log("device storage is unavialable");
      fileInput.click();
    }
  });

  var looperControl = new View.Looper({looper: looper,
                                       recordButton: document.querySelector("#recording"),
                                       trackButton: document.querySelectorAll("[data-role=track-selector]")
                                      });
  var micButton = new View.MicButton({mic: mic, el: document.querySelector("#microphone")});
  var filterControl = new View.Filter({pad: document.querySelector("[data-role=pad]"),
                                       changeButton: document.querySelector("#select-filter-type"),
                                       actionListController: myApp,
                                       filter: filter,
                                       indicaterX: document.querySelector("#x"),
                                       indicaterY: document.querySelector("#y")
                                      });
  var visualizer = new View.Visualizer({analyser: analyser,
                                        canvas: document.querySelector("#visualizer")});
  visualizer.start();
});
