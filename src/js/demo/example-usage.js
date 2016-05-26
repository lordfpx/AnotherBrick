"use strict";
// -------------------
// DIRECTLY ACCESSIBLE
// -------------------

// return AB informations
AB.about();

// run callback when al: img are loaded
// Can be usefull after ajax response: call it onSuccess with correct selector of course
var imagesLoadedCallback = function() {
  console.log('AB.imagesLoaded ==>', 'images inside $("[data-ab-equalizer]") loaded');
};
AB.imagesLoaded($('[data-ab-equalizer]'), imagesLoadedCallback);

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

/*
  init AB and your needed plugins

  Some plugins/scripts are always initilized for direct use:
  - imagesLoaded
  - fn
  - easing
  - deviceDetect

  some are always initialized with default settings, but can be personalized:
  - mediaQuery

  others are optional:
  - equalizer
  - scrollTo
  - interchange
*/

AB.init({
  // mediaQuery plugin is ALWAYS initialized, but you can override default settings here ONLY if:
  // - you are not using Sass technic (I don't recommand)
  mediaQuery: {
    small: "639px",
    medium: "640px",
    large: "1024px",
    xlarge: "1200px",
    xxlarge: "1440px"
  },

  // equalizer: no specific options
  equalizer: {},

  /* scrollTo:
  options:
  - duration: 500,
  - offset: 0, (scroll before or after the target, usefull when using sticky navigation)
  - easing: 'easeOutQuad' (check AB.easing opbject in browser console for all available easings)
  */
  scrollTo: {
    duration: 1000
  },

  // interchange: no specific options
  interchange: {}
});
