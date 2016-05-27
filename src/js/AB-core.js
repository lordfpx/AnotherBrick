"use strict";

window.AB = (function(){
  var name = "AB - Another Brick on the web",
      description = "Plugins collection to solve everyday problems in web sites development",
      version = "0.1.0",
      author = "Thierry Philippe - www.thierryphilippe.fr";

  return {
    about: function() {
      console.log(name + ": " + description + " v" + version + " by " + author.name + " (" + author.email + ")");
    },

    init: function(plugins){
      // keep user's settings
      AB.userSettings = plugins;

      // mandatory plugins
      if (!plugins.hasOwnProperty('mediaQuery')) AB.mediaQuery();

      // init add-ons
      for (var plugin in plugins) {
        if (!plugins.hasOwnProperty(plugin)) continue;
        AB[plugin](plugins[plugin]);
      }
    },

    fn:             require('../js/AB-fn'),             // self initialized
    easing:         require('../js/AB-easing'),         // self initialized
    imagesLoaded:   require('../js/AB-imagesLoaded'),   // self initialized
    deviceDetect:   require('../js/AB-deviceDetect'),   // self initialized

    mediaQuery:     require('../js/AB-mediaQuery'),     // mandatory (initialized by core)

    equalizer:      require('../js/AB-equalizer'),      // user's choice
    scrollTo:       require('../js/AB-scrollTo'),       // user's choice
    interchange:    require('../js/AB-interchange'),    // user's choice

    reflow: function() {
      // reinit from user's settings
      var plugins = AB.userSettings;

      for (var plugin in plugins) {
        if (plugin !== "mediaQuery") { // mediaQuery can't be reinit
          if (!plugins.hasOwnProperty(plugin)) continue;
          AB[plugin](plugins[plugin]);
        }
      }
    }
  };
})();