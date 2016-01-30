"use strict";

var packageJson = require('../../package.json');

window.AB = {
  name:           packageJson.name,
  description:    packageJson.description,
  version:        packageJson.version,
  author:         packageJson.author,

  about: function() {
    console.log(this.name + ": " + this.description + " v" + this.version + " by " + this.author.name + " (" + this.author.email + ")");
  },

  fn:             require('../js/AB-fn'),
  easing:         require('../js/AB-easing'),
  imagesLoaded:   require('../js/AB-imagesLoaded'),
  resizeEvent:    require('../js/AB-resizeEvent'),
  equalizer:      require('../js/AB-equalizer'),
  deviceDetect:   require('../js/AB-deviceDetect'),
  mediaQuery:     require('../js/AB-mediaQuery'),
  scrollTo:       require('../js/AB-scrollTo')
};
