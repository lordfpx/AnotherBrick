(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

// https://github.com/branneman/TinyAnimate

var easing = {

  linear: function(t, b, c, d) {
    return c * t / d + b;
  },
  easeInQuad: function(t, b, c, d) {
    return c * (t /= d) * t + b;
  },
  easeOutQuad: function(t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
  },
  easeInOutQuad: function(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
  },
  easeInCubic: function(t, b, c, d) {
    return c * (t /= d) * t * t + b;
  },
  easeOutCubic: function(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  },
  easeInOutCubic: function(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t + 2) + b;
  },
  easeInQuart: function(t, b, c, d) {
    return c * (t /= d) * t * t * t + b;
  },
  easeOutQuart: function(t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
  },
  easeInOutQuart: function(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
    return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
  },
  easeInQuint: function(t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
  },
  easeOutQuint: function(t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
  },
  easeInOutQuint: function(t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
  },
  easeInSine: function(t, b, c, d) {
    return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
  },
  easeOutSine: function(t, b, c, d) {
    return c * Math.sin(t / d * (Math.PI / 2)) + b;
  },
  easeInOutSine: function(t, b, c, d) {
    return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
  },
  easeInExpo: function(t, b, c, d) {
    return (t === 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
  },
  easeOutExpo: function(t, b, c, d) {
    return (t === d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
  },
  easeInOutExpo: function(t, b, c, d) {
    if (t === 0) return b;
    if (t === d) return b + c;
    if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
  },
  easeInCirc: function(t, b, c, d) {
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
  },
  easeOutCirc: function(t, b, c, d) {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
  },
  easeInOutCirc: function(t, b, c, d) {
    if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
    return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
  },
  easeInElastic: function(t, b, c, d) {
    var p = 0;
    var a = c;
    var s;
    if (t === 0) return b;
    if ((t /= d) === 1) return b + c;
    if (!p) p = d * 0.3;
    if (a < Math.abs(c)) {
      a = c;
      s = p / 4;
    }
    else s = p / (2 * Math.PI) * Math.asin(c / a);
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
  },
  easeOutElastic: function(t, b, c, d) {
    var p = 0;
    var a = c;
    var s;
    if (t === 0) return b;
    if ((t /= d) === 1) return b + c;
    if (!p) p = d * 0.3;
    if (a < Math.abs(c)) {
      a = c;
      s = p / 4;
    }
    else s = p / (2 * Math.PI) * Math.asin(c / a);
    return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
  },
  easeInOutElastic: function(t, b, c, d) {
    var p = 0;
    var a = c;
    var s;
    if (t === 0) return b;
    if ((t /= d / 2) === 2) return b + c;
    if (!p) p = d * (0.3 * 1.5);
    if (a < Math.abs(c)) {
      a = c;
      s = p / 4;
    }
    else s = p / (2 * Math.PI) * Math.asin(c / a);
    if (t < 1) return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
  },
  easeInBack: function(t, b, c, d, s) {
    if (s === undefined) s = 1.70158;
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
  },
  easeOutBack: function(t, b, c, d, s) {
    if (s === undefined) s = 1.70158;
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
  },
  easeInOutBack: function(t, b, c, d, s) {
    if (s === undefined) s = 1.70158;
    if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
    return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
  },
  easeInBounce: function(t, b, c, d) {
    return c - easing.easeOutBounce(d - t, 0, c, d) + b;
  },
  easeOutBounce: function(t, b, c, d) {
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
  easeInOutBounce: function(t, b, c, d) {
    if (t < d / 2) return easing.easeInBounce(t * 2, 0, c, d) * 0.5 + b;
    return easing.easeOutBounce(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
  }

};

module.exports = easing;

},{}],4:[function(require,module,exports){
"use strict";

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
  if (!(this instanceof Equalizer)) return new Equalizer(element, opt);

  this.settings     = AB.fn.extend({}, Equalizer.defaults, opt);
  this.$el          = $(element);
  this.resizeEvent  = {};

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

    AB.imagesLoaded(selector, function() {
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
  },

  // extend objects
  extend: function(){
    for(var i=1; i<arguments.length; i++) {
      for(var key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key)) arguments[0][key] = arguments[i][key];
      }
    }
    return arguments[0];
  },

  // element.matches(selector) with browser prefixes
  // usage: AB.fn.selectorMatches(element, selector)
  selectorMatches: function(el, selector) {
  	var p = Element.prototype;
  	var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function(s) {
  		return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
  	};
  	return f.call(el, selector);
  }

};

module.exports = fn;

},{}],6:[function(require,module,exports){
"use strict";

function imagesLoaded(wrapper, callback) {
  var images = document.querySelectorAll(wrapper + " img"),
      unloaded = images.length;

  if (unloaded === 0) callback();

  var singleImageLoaded = function() {
    unloaded--;
    if (unloaded === 0) callback();
  };

  for (var i = 0; i < unloaded; i++) {
    var image = images[i];

    if (image.complete) {
      singleImageLoaded();
    } else if (typeof image.naturalWidth !== 'undefined' && image.naturalWidth > 0) {
      singleImageLoaded();
    } else {
      image.addEventListener('load', singleImageLoaded);
    }
  }
}

module.exports = imagesLoaded;

},{}],7:[function(require,module,exports){
"use strict";

var Interchange = function(element, opt) {
  if (!(this instanceof Interchange)) return new Interchange(element, opt);

  this.settings = AB.fn.extend({}, Interchange.defaults, opt);
  this.$element = $(element);
  this.rules    = [];

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

var MediaQuery = function(opt) {
  if (!(this instanceof MediaQuery)) return new MediaQuery(opt);

  this.settings = AB.fn.extend({}, MediaQuery.defaults, opt);
  this.queries  = [];
  this.current  = '';

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

function ScrollTo(opt) {
  if (!(this instanceof ScrollTo)) return new ScrollTo(opt);

  this.settings = AB.fn.extend({}, ScrollTo.defaults, opt);
  this.trigger  = '[data-ab-scrollto], a[href*="#"]:not([href="#"])';

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

    document.addEventListener('click', function(e) {
      e.preventDefault();
      var target = e.target;

      if (target && AB.fn.selectorMatches(target, that.trigger)) {
        if (AB.fn.selectorMatches(target, '[data-ab-scrollto]')) {
          that.getTarget(target);
          return;
        }
        that.getAnchor(target);
      }
    });
  },

  // Get the target element from data-ab-scrollto
  getTarget: function(el) {
    var targetSelector = el.getAttribute('data-ab-scrollto'),
        target = document.querySelector(targetSelector);

    if (!!target) this.scroll(target);
  },

  // Get the target element from href
  getAnchor: function(el) {
    var location = window.location;

    if (location.pathname.replace(/^\//, '') === el.pathname.replace(/^\//, '') && location.hostname === el.hostname) {
      // search for element with ID or A with name attribute
      var target = document.querySelector(el.hash) || document.querySelector('[name=' + el.hash.slice(1) + ']');

      if (!!target) this.scroll(target);
    }
  },

  // Scroll to that element
  scroll: function(target) {
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
      var val = target.offsetTop - that.settings.offset,
          limitPos = document.body.offsetHeight - window.innerHeight;

      if (val > limitPos) val = limitPos;
      return val;
    };

    var fromPos =     position(),
        changePos =   toPos() - fromPos,
        startTime =   null,
        currentTime = 0;

    var animateScroll = function(time) {
      if (time === undefined) time = new Date().getTime();
      if (startTime === null) startTime = time;

      currentTime = time-startTime;

      var val = AB.easing[that.settings.easing](null, currentTime, fromPos, changePos, that.settings.duration);

      // move the document.body
      move(val);

      // do the animation unless its over
      if (currentTime < that.settings.duration) {
        requestAnimFrame(animateScroll);
      } else {
        $(document).trigger('scrolled.ab-scrollTo', [target]);
      }
    };

    requestAnimFrame(animateScroll);
  }
};

module.exports = ScrollTo;


},{}]},{},[1]);
