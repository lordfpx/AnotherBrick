"use strict";
// -------------------
// DIRECTLY ACCESSIBLE
// -------------------

// return AB informations
AB.about();

// run callback when al: img are loaded
// Can be usefull after ajax response: call it onSuccess with correct selector of course
var imagesLoadedCallback = function() {
  console.log('AB.imagesLoaded ==>', 'images inside $("[data-ab-equalizer] img") loaded');
};
AB.imagesLoaded($('[data-ab-equalizer] img'), imagesLoadedCallback);

// device detection: return true or false
console.log(
  "AB.deviceDetect.get('OS', 'iOS') ==>", AB.deviceDetect.get('browser', 'iOS')
);
console.log(
  "AB.deviceDetect.get('browser', 'Android') ==>", AB.deviceDetect.get('browser', 'iOS')
);
console.log("AB.deviceDetect.isTouch() ==>", AB.deviceDetect.isTouch()); // return true on touch devices


// ------------------
// INIT WHAT YOU NEED
// ------------------

// init mediaQuery
AB.mediaQuery();

// init equalizer
AB.equalizer();

// init scrollTo
AB.scrollTo({
  duration: 1000
});

// resizeEvent USAGE
var block1 = AB.resizeEvent('.data-ab-equalizer', function(){
  console.log('AB.resizeEvent ==>', '.data-ab-equalizer was resized');
});
