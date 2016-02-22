"use strict";

/**
 * @module AB
 * @desc
 * When creating a website, we always face the same problems such as load assets depending on mediaqueries, equalize element's height, etc. AB is there to help you deals with that.
 * It's a plugins bundle with some code taken from Zurb Foundation (and adapted), others from me and other sources.
 * The idea behind this project is to give you bricks of JavaScripts to solve usual design difficulties.
*/
window.AB = (function(){
  var name = "AB - Another Brick on the web";
  var description = "Plugins collection to solve everyday problems in web sites development";
  var version = "0.1.0";
  var author = "Thierry Philippe - www.thierryphilippe.fr";

  return {
    /**
     * @static
     * @desc Display AB informations in the browser console
     * @example
     * AB.about();
     */
    about: function() {
      console.log(name + ": " + description + " v" + version + " by " + author.name + " (" + author.email + ")");
    },

    /**
     * @static
     * @desc Initialize AB
     * @example
     * // Initialize AB with default settings
     * AB.init();
     *
     * // Initialize with personal settings (that's only an example)
     * AB.init({
     *   mediaQuery: {
     *     small: "639px",
     *     medium: "640px",
     *     large: "1024px",
     *     xlarge: "1200px",
     *     xxlarge: "1440px"
     *   },
     *   equalizer: {},
     *   scrollTo: {
     *     duration: 1000
     *   },
     *   interchange: {}
     * });
    */
    init: function(plugins){
      // keep user's settings
      AB.userSettings = plugins;

      // mandatory plugins
      if (!plugins.hasOwnProperty('mediaQuery')) {
        AB.mediaQuery();
      }

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
    deviceDetect:   require('../js/AB-deviceDetect'),   // self initialized

    mediaQuery:     require('../js/AB-mediaQuery'),     // mandatory (initialized by core)

    equalizer:      require('../js/AB-equalizer'),      // user's choice
    scrollTo:       require('../js/AB-scrollTo'),       // user's choice
    interchange:    require('../js/AB-interchange'),     // user's choice

    /**
     * @static
     * @desc Reflow plugins when the DOM is changed (after an ajax response for ex.)
     * @example
     * AB.reflow();
     */
    reflow: function() {
      // reinit from user's settings
      var plugins = AB.userSettings;

      for (var plugin in plugins) {
        if (plugin !== "mediaQuery") { // mediaQuery can't be reinit
          if (plugins.hasOwnProperty(plugin)) {
            AB[plugin](plugins[plugin]);
          }
        }
      }
    },
  };
})();