(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

/**
 * # AB - Another Brick
 * When creating a website, we always face the same problems such as load assets depending on mediaqueries, equalize element's height, etc. AB is there to help you deals with that.
 * It's a plugins bundle with some code taken from Zurb Foundation (and adapted), others from me and other sources.
 * The idea behind this project is to give you bricks of JavaScripts to solve usual design difficulties.
 * @module AB
*/
window.AB = (function(){
  var name = "AB - Another Brick on the web";
  var description = "Plugins collection to solve everyday problems in web sites development";
  var version = "0.1.0";
  var author = "Thierry Philippe - www.thierryphilippe.fr";

  return {
    /**
     * Display AB informations such as version, description, author
     * @example
     * AB.about();
     */
    about: function() {
      console.log(name + ": " + description + " v" + version + " by " + author.name + " (" + author.email + ")");
    },

    /**
     * Initialize AB
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
     * Reflow plugins when the DOM is changed (after an ajax response for ex.)
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
},{"../js/AB-deviceDetect":2,"../js/AB-easing":3,"../js/AB-equalizer":4,"../js/AB-fn":5,"../js/AB-imagesLoaded":6,"../js/AB-interchange":7,"../js/AB-mediaQuery":8,"../js/AB-scrollTo":9}],2:[function(require,module,exports){
"use strict";

/*
USAGE

AB.deviceDetect.get('browser', 'any');
=> return true or false

AB.deviceDetect.isTouch();
=> return true on touch devices
*/

var deviceDetect = {
  browser: {
    Android: function(userAgent, appVersion) {
      return userAgent.match(/Android/i) ? true : false;
    },
    BlackBerry: function(userAgent, appVersion) {
      return userAgent.match(/BlackBerry/i) ? true : false;
    },
    iOS: function(userAgent, appVersion) {
      return userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    },
    Windows: function(userAgent, appVersion) {
      return userAgent.match(/IEMobile/i) ? true : false;
    },
    any: function(userAgent, appVersion) {
      return  (this.Android(userAgent, appVersion) ||
              this.BlackBerry(userAgent, appVersion) ||
              this.iOS(userAgent, appVersion) ||
              this.Windows(userAgent, appVersion));
    }
  },

  OS: {
    iOS: function(userAgent, appVersion) {
      return appVersion.match(/iPhone|iPod/i) ? true : false;
    },
    Android: function(userAgent, appVersion) {
      return appVersion.match(/Android/i) ? true : false;
    },
    Windows: function(userAgent, appVersion) {
      return appVersion.match(/Windows NT/i) ? true : false;
    }
  },

  // https://ctrlq.org/code/19616-detect-touch-screen-javascript
  isTouch: function() {
    return  (('ontouchstart' in window) ||
            (navigator.MaxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
  },

  get: function(type, device) {
    var userAgent = navigator.userAgent,
        appVersion = navigator.appVersion;

    return this[type][device](userAgent, appVersion);
  }
};

module.exports = deviceDetect;

},{}],3:[function(require,module,exports){
"use strict";

// https://github.com/danro/jquery-easing/blob/master/jquery.easing.js

var easing = {

  def: 'easeOutQuad',
  easeInQuad: function(x, t, b, c, d) {
    return c * (t /= d) * t + b;
  },
  easeOutQuad: function(x, t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
  },
  easeInOutQuad: function(x, t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
  },
  easeInCubic: function(x, t, b, c, d) {
    return c * (t /= d) * t * t + b;
  },
  easeOutCubic: function(x, t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  },
  easeInOutCubic: function(x, t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t + 2) + b;
  },
  easeInQuart: function(x, t, b, c, d) {
    return c * (t /= d) * t * t * t + b;
  },
  easeOutQuart: function(x, t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
  },
  easeInOutQuart: function(x, t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
  },
  easeInQuint: function(x, t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
  },
  easeOutQuint: function(x, t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
  },
  easeInOutQuint: function(x, t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
  },
  easeInSine: function(x, t, b, c, d) {
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
  },
  easeOutSine: function(x, t, b, c, d) {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
  },
  easeInOutSine: function(x, t, b, c, d) {
    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
  },
  easeInExpo: function(x, t, b, c, d) {
    return (t === 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
  },
  easeOutExpo: function(x, t, b, c, d) {
    return (t === d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
  },
  easeInOutExpo: function(x, t, b, c, d) {
    if (t === 0) return b;
    if (t === d) return b + c;
    if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
  },
  easeInCirc: function(x, t, b, c, d) {
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
  },
  easeOutCirc: function(x, t, b, c, d) {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
  },
  easeInOutCirc: function(x, t, b, c, d) {
    if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
    return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
  },
  easeInElastic: function(x, t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t === 0) return b;
    if ((t /= d) === 1) return b + c;
    if (!p) p = d * 0.3;
    if (a < Math.abs(c)) {
      a = c;
      s = p / 4;
    } else s = p / (2 * Math.PI) * Math.asin(c / a);
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
  },
  easeOutElastic: function(x, t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t === 0) return b;
    if ((t /= d) === 1) return b + c;
    if (!p) p = d * 0.3;
    if (a < Math.abs(c)) {
      a = c;
      s = p / 4;
    } else s = p / (2 * Math.PI) * Math.asin(c / a);
    return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
  },
  easeInOutElastic: function(x, t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t === 0) return b;
    if ((t /= d / 2) === 2) return b + c;
    if (!p) p = d * (0.3 * 1.5);
    if (a < Math.abs(c)) {
      a = c;
      s = p / 4;
    } else s = p / (2 * Math.PI) * Math.asin(c / a);
    if (t < 1) return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
  },
  easeInBack: function(x, t, b, c, d, s) {
    if (s === undefined) s = 1.70158;
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
  },
  easeOutBack: function(x, t, b, c, d, s) {
    if (s === undefined) s = 1.70158;
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
  },
  easeInOutBack: function(x, t, b, c, d, s) {
    if (s === undefined) s = 1.70158;
    if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
    return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
  },
  easeInBounce: function(x, t, b, c, d) {
    return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
  },
  easeOutBounce: function(x, t, b, c, d) {
    if ((t /= d) < (1 / 2.75)) {
      return c * (7.5625 * t * t) + b;
    } else if (t < (2 / 2.75)) {
      return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
    } else if (t < (2.5 / 2.75)) {
      return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
    } else {
      return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
    }
  },
  easeInOutBounce: function(x, t, b, c, d) {
    if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * 0.5 + b;
    return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
  }

};

module.exports = easing;

},{}],4:[function(require,module,exports){
"use strict";

/*
USAGE

*/

// filter elements to keep only 1 elements with same attribute and value
function uniqueElByAttributeValue($elArray, attribute) {
  var obj = {},
      category;

  var filteredEl = $elArray.filter(function(){
    category = $(this).attr(attribute);
    if(obj[category]){
      return false;
    } else {
      obj[category] = true;
      return true;
    }
  });

  return filteredEl;
}


function Equalizer(element, opt) {
  if (!(this instanceof Equalizer)) {
    return new Equalizer(element, opt);
  }

  this.settings = $.extend({}, Equalizer.defaults, opt);

  this.$el = $(element);
  this.resizeEvent = {};

  this.init();
}

Equalizer.defaults = {};

Equalizer.prototype = {
  init: function() {
    var that = this,
        $el = this.$el;

    for (var i = 0, len = $el.length; i < len; i++) {
      var selectorValue = $( $el[i] ).attr('data-ab-equalizer'),
          selector = '[data-ab-equalizer="'+ selectorValue +'"]';

      this.startEqualize(selector);
    }

    return this;
  },

  startEqualize: function(selector){
    var that = this,
        $wrapper = $(selector);

    AB.imagesLoaded($wrapper, function() {
      that._equalize($wrapper)
          ._watch(selector, $wrapper);
    });
  },

  _watch: function(selector, $el) {
    var that = this,
        $wrapper = $(selector),
        scrollTimeout;

    $(window).on('resize.ab-equalizer', function(){
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
        scrollTimeout = null;
      }
      scrollTimeout = setTimeout(function(){
        that._equalize($wrapper);
      }, 200);
    });
  },

  _getMaxHeight: function($el) {
    var heights = [];

    for (var i = 0, len = $el.length; i < len; i++) {
      $($el[i]).css('height', '');
      heights.push( $($el[i]).outerHeight(true) );
    }

    return Math.max.apply(null, heights);
  },

  _equalize: function($el) {
    var height = this._getMaxHeight($el);

    $el.css('height', height);
    $(window).trigger('equalized.ab-equalizer', [$el]);

    return this;
  }
};

function equalizer(opt){
  var elements = uniqueElByAttributeValue($('[data-ab-equalizer]'), 'data-ab-equalizer');

  for (var i = 0, len = elements.length; i < len; i++) {
    if (!elements[i].dataset.plugin_equalizer) {
      elements[i].dataset.plugin_equalizer = new Equalizer(elements[i], opt);
    }
  }
}

module.exports = equalizer;

},{}],5:[function(require,module,exports){
"use strict";

var fn = {

  // can a string be a JSON parsed?
  isJson: function(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

};

module.exports = fn;

},{}],6:[function(require,module,exports){
"use strict";

/*
From https://github.com/zurb/foundation-sites

USAGE:

var callback = function() {
  console.log('imagesLoadedCallback: Images loaded');
};
AB.imagesLoaded( $('img'), callback );

*/

function imagesLoaded($wrapper, callback) {
  var $images = $wrapper.find('img'),
      unloaded = $images.length;

  if (unloaded === 0) {
    callback();
  }

  var singleImageLoaded = function() {
    unloaded--;
    if (unloaded === 0) {
      callback();
    }
  };

  for (var i = 0, len = unloaded; i < len; i++) {
    var image = $images[i];

    if (image.complete) {
      singleImageLoaded();
    } else if (typeof image.naturalWidth !== 'undefined' && image.naturalWidth >0) {
      singleImageLoaded();
    } else {
      $(image).one('load', singleImageLoaded);
    }
  }
}

module.exports = imagesLoaded;

},{}],7:[function(require,module,exports){
"use strict";

/*
Heavily inspired by https://github.com/zurb/foundation-sites


*/


var Interchange = function(element, opt) {
  if (!(this instanceof Interchange)) {
    return new Interchange(element, opt);
  }

  this.settings = $.extend({}, Interchange.defaults, opt);

  this.$element = $(element);
  this.rules = [];

  this.init()
      ._events();
};

Interchange.defaults = {
  rules: null
};

Interchange.prototype = {
  init: function() {
    this._generateRules()
        ._reflow();

    return this;
  },

  _generateRules: function() {
    var rulesList = [],
        rules;

    if (this.settings.rules) {
      rules = this.settings.rules;
    }
    else {
      rules = this.$element.data('ab-interchange').match(/\[.*?\]/g);
    }

    for (var i = 0, len = rules.length; i < len; i++) {
      var rule = rules[i].slice(1, -1).split(', '),
          path = rule.slice(0, -1).join(''),
          query = rule[rule.length - 1];

      rulesList.push({
        path: path,
        query: query
      });
    }

    this.rules = rulesList;

    return this;
  },

  _reflow: function() {
    var match,
        path,
        currentQuery = AB.mediaQuery.current;

    // Iterate through each rule
    for (var i = 0, len = this.rules.length; i < len; i++) {
      var rule = this.rules[i];

      if ( window.matchMedia(AB.mediaQuery.get(rule.query)).matches ) {
        path = rule.path;
        match = true;
      }
    }

    if (match) {
      this._replace(path);
    }
  },

  _events: function() {
    $(window).on('resize.ab-interchange', this._reflow.bind(this));
  },

  _replace: function(path) {
    if (this.currentPath === path) return;

    var that = this,
        trigger = 'replaced.ab-interchange';

    // Replacing images
    if (this.$element[0].nodeName === 'IMG') {
      this.$element.attr('src', path).load(function() {
        that.currentPath = path;
      }).trigger(trigger);
    }
    // Replacing background images
    else if (path.match(/\.(gif|jpg|jpeg|tiff|png)([?#].*)?/i)) {
      this.$element.css({ 'background-image': 'url('+path+')' }).trigger(trigger);
    }
    // Replacing HTML
    else {
      $.get(path, function(response) {
        that.$element.html(response).trigger(trigger);
        that.currentPath = path;
      });
    }
  }
};

function interchange(opt){
  var elements = document.querySelectorAll('[data-ab-interchange]');

  for (var i = 0, len = elements.length; i < len; i++) {
    if (!elements[i].dataset.plugin_interchange) {
      elements[i].dataset.plugin_interchange = new Interchange(elements[i], opt);
    }
  }
}

module.exports = interchange;

},{}],8:[function(require,module,exports){
"use strict";

/*
Heavily inspired by https://github.com/zurb/foundation-sites

Get current breakpoint:
----------------------
AB.mediaQuery.current;
=> return current breakpoint (small, medium, large, xlarge, xxlarge)

Match specific breakpoint:
-------------------------
AB.mediaQuery.atLeast('small');
=> return true or false

Listener on breakpoint change:
-----------------------------
$(window).on('changed.mediaquery', function(e, newSize, current) {
  console.log(newSize, current);
});

List queries object:
-------------------
AB.mediaQuery.getQueries();

Return real media-query from breakpoint name:
--------------------------------------------
AB.mediaQuery.get('small');
*/

var MediaQuery = function(opt) {
  if (!(this instanceof MediaQuery)) {
    return new MediaQuery(opt);
  }

  this.settings = $.extend({}, MediaQuery.defaults, opt);
  this.queries = [];
  this.current = '';

  this.init();
};

MediaQuery.defaults = {
  small: "639px",
  medium: "640px",
  large: "1024px",
  xlarge: "1200px",
  xxlarge: "1440px"
};

MediaQuery.prototype = {
  init: function() {
    var $meta = $('#AB-mediaQuery'),
        resizeTimeout;

    if (!$meta.length) {
      var meta = document.createElement('meta');
      meta.id = 'AB-mediaQuery';
      document.getElementsByTagName('head')[0].appendChild(meta);
    }

    var namedQueries = this.getQueries();

    for (var key in namedQueries) {
      if (key === 'small') {
        this.queries.push({
          name: key,
          value: 'only screen and (max-width: ' + namedQueries[key] + ')'
        });
      } else {
        this.queries.push({
          name: key,
          value: 'only screen and (min-width: ' + namedQueries[key] + ')'
        });
      }
    }

    this.current = this._getCurrentSize();
    this._watcher();
    this._setVar();

    return this;
  },

  _setVar: function() {
    var namedQueries = this.getQueries();
    this.is = {};

    for (var key in namedQueries) {
      if( namedQueries.hasOwnProperty( key ) ) {
        switch (key) {
          case 'small':
            this.is[key + '_only']  = 'only screen and (max-width: ' + namedQueries[key] + ')';
            this.is[key + '_up']    = 'only screen';
            break;
          case 'medium':
            this.is[key + '_only']  = 'only screen and (min-width: ' + namedQueries[key] + ') and (max-width: ' + namedQueries.large + ')';
            this.is[key + '_up']    = 'only screen and (min-width: ' + namedQueries[key] + ')';
            break;
          case 'large':
            this.is[key + '_only']  = 'only screen and (min-width: ' + namedQueries[key] + ') and (max-width: ' + namedQueries.xlarge + ')';
            this.is[key + '_up']    = 'only screen and (min-width: ' + namedQueries[key] + ')';
            break;
          case 'xlarge':
            this.is[key + '_only']  = 'only screen and (min-width: ' + namedQueries[key] + ') and (max-width: ' + namedQueries.xxlarge + ')';
            this.is[key + '_up']    = 'only screen and (min-width: ' + namedQueries[key] + ')';
            break;
          case 'xxlarge':
            this.is[key + '_only']  = 'only screen and (min-width: ' + namedQueries[key] + ')';
            this.is[key + '_up']    = 'only screen and (min-width: ' + namedQueries[key] + ')';
            break;
        }
      }
    }
  },

  _getCurrentSize: function() {
    var matched;

    this.queries.forEach(function(el, i, array) {
      if (window.matchMedia(el.value).matches) {
        matched = el;
      }
    });

    if (typeof matched === 'object') {
      return matched.name;
    } else {
      return matched;
    }
  },

  getQueries: function() {
    var extractedStyles = decodeURI($('#AB-mediaQuery').css('font-family').trim().slice(1, -1)); // browsers re-quote string style values
    return AB.fn.isJson(extractedStyles) ? JSON.parse(extractedStyles) : this.settings;
  },

  get: function(size) {
    if (typeof size === 'undefined') { return; }

    var queries = this.queries;

    for (var i = 0, len = queries.length; i < len; i++) {
      var thisQuery = queries[i];
      if (size === thisQuery.name) {
        return thisQuery.value;
      }
    }
  },

  _watcher: function() {
    var that = this,
        resizeTimeout,
        newSize;

    $(window).on('resize.ab-mediaquery', function() {
      newSize = that._getCurrentSize();

      if (newSize !== that.current) {
        $(window).trigger('changed.ab-mediaquery', [newSize, that.current]);
        that.current = newSize;
      }
    });
  },

  atLeast: function(size) {
    var query = this.get(size);

    if (query) {
      return window.matchMedia(query).matches;
    }
  }
};

function mediaQuery(opt) {
  AB.mediaQuery = new MediaQuery(opt);
}

module.exports = mediaQuery;

},{}],9:[function(require,module,exports){
"use strict";

/**
 * Smooth scroll to anchor links or to the element specified in data-ab-scrollto attribute.
 * @class
 * @param {object=} opt - user options
 * @param {number=} opt.duration=500 - Duration of the scroll
 * @param {number=} opt.offset=0 - offset target (usefull when using a sticky navigation for ex.)
 * @param {string=} opt.easing=swing - {@link easing}
 *
 * @example
 * AB.init({
 * 	scrollTo: {
 * 		duration: 1000,
 * 		offset: 0,
 * 		easing: 'swing'
 * 	}
 * })
 *
 * <a href="#target">...</a>
 * // or
 * <div data-ab-scrollto=".target">...</div>
 *
 */
function ScrollTo(opt) {
  if (!(this instanceof ScrollTo)) {
    return new ScrollTo(opt);
  }

  this.settings = $.extend({}, ScrollTo.defaults, opt);
  this.trigger = '[data-ab-scrollto], a[href*="#"]:not([href="#"])';

  this.init();
}

ScrollTo.defaults = {
  duration: 500,
  offset: 0,
  easing: 'easeOutQuad'
};

ScrollTo.prototype = {
  init: function() {
    var that = this;

    $(document)
      .off('click.ab-scrollTo')
      .on('click.ab-scrollTo', this.trigger, function(e) {
        e.preventDefault();
        var $this = $(this);

        if ($this.is('[data-ab-scrollto]')) {
          that.getTarget($this);
          return;
        }
        that.getAnchor(this);
      });
  },

  /**
   * Get the target element from data-ab-scrollto
   * @param  {object} $el - Element triggered to get it's target
   */
  getTarget: function($el) {
    var $target = $($el.data('ab-scrollto'));
    if ($target.length) {
      this.scroll($target);
    }
  },

  /**
   * Get the target element from href
   * @param  {object} el - Link triggered
   */
  getAnchor: function(el) {
    console.log(typeof el);
    var location = window.location;

    if (location.pathname.replace(/^\//, '') === el.pathname.replace(/^\//, '') && location.hostname === el.hostname) {
      var $target = $(el.hash);
      $target = $target.length ? $target : $('[name=' + el.hash.slice(1) + ']');

      if ($target.length) {
        this.scroll($target);
      }
    }
  },

  /**
   * Scroll to that element
   * @param  {object} $target - scroll to that element target
   */
  scroll: function($target) {
    var that = this;

    // requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
    var requestAnimFrame = (function() {
      return  window.requestAnimationFrame ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame ||
              function(callback) {
                window.setTimeout(callback, 1000 / 60);
              };
    })();

    function move(amount) {
      document.documentElement.scrollTop = amount;
      document.body.parentNode.scrollTop = amount;
      document.body.scrollTop = amount;
    }

    function position() {
      return  document.documentElement.scrollTop ||
              document.body.parentNode.scrollTop ||
              document.body.scrollTop;
    }

    var toPos = function(){
      var val = $target.offset().top - that.settings.offset,
          limitPos = document.body.offsetHeight - window.innerHeight;

      if (val > limitPos) {
        val = limitPos;
      }
      return val;
    };

    var fromPos =     position(),
        changePos =   toPos() - fromPos,
        startTime =   null,
        currentTime = 0;

    var animateScroll = function(time) {
      if (time === undefined) {
        time = new Date().getTime();
      }
      if (startTime === null) {
        startTime = time;
      }

      currentTime = time-startTime;

      var val = AB.easing[that.settings.easing](null, currentTime, fromPos, changePos, that.settings.duration);

      // move the document.body
      move(val);

      // do the animation unless its over
      if (currentTime < that.settings.duration) {
        requestAnimFrame(animateScroll);
      } else {
        $(document).trigger('scrolled.ab-scrollTo', [$target]);
      }
    };

    requestAnimFrame(animateScroll);
  }
};

module.exports = ScrollTo;

},{}]},{},[1]);
