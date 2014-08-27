define([
  "view/on-off-button",
  "view/mic-button",
  "view/looper",
  "view/filter",
  "view/visualizer"
], function(
  OnOffButton,
  MicButton,
  Looper,
  Filter,
  Visualizer){

  return {
    OnOffButton: OnOffButton,
    MicButton: MicButton,
    Looper: Looper,
    Filter: Filter,
    Visualizer: Visualizer
  };
  
});
