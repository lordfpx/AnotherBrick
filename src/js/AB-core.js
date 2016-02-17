"use strict";

window.AB = {
  name:           "AB - Another Brick on the web",
  description:    "Plugins collection to solve everyday problems in web sites development",
  version:        "0.1.0",
  author:         "Thierry Philippe - www.thierryphilippe.fr",

  about: function() {
    console.log(this.name + ": " + this.description + " v" + this.version + " by " + this.author.name + " (" + this.author.email + ")");
  },

  init: function(plugins){
    // mandatory plugins
    AB.mediaQuery();

    // init add-ons
    for (var plugin in plugins) {
      if (plugins.hasOwnProperty(plugin)) {
        AB[plugin](plugins[plugin]);
      }
    }
  },

  fn:             require('../js/AB-fn'),             // self initialized
  easing:         require('../js/AB-easing'),         // self initialized
  imagesLoaded:   require('../js/AB-imagesLoaded'),   // self initialized
  equalizer:      require('../js/AB-equalizer'),      // user's choice
  deviceDetect:   require('../js/AB-deviceDetect'),   // self initialized
  mediaQuery:     require('../js/AB-mediaQuery'),     // mandatory (initialized by core)
  scrollTo:       require('../js/AB-scrollTo'),       // user's choice
  interchange:    require('../js/AB-interchange')     // user's choice
};
