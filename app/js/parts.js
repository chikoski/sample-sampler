define([
  "parts/microphone",
  "parts/looper",
  "parts/filter"
], function(
  Microphone,
  Looper,
  Filter
){
  return {
    Microphone: Microphone,
    Looper: Looper,
    Filter: Filter
  };
});
