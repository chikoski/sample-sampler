define([
  "view/on-off-button",
  "view/mic-button",
  "view/looper",
  "view/filter"
], function(
  OnOffButton,
  MicButton,
  Looper,
  Filter){

  return {
    OnOffButton: OnOffButton,
    MicButton: MicButton,
    Looper: Looper,
    Filter: Filter
  };
  
});
