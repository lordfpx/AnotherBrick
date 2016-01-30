(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  "name": "AnotherBrick",
  "version": "0.1.0",
  "description": "Another Brick... on the web",
  "main": "gulpfile.js",
  "scripts": {
    "start": "gulp",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "homepage": "",
  "author": {
    "name": "Thierry Philippe",
    "email": "contact@thierryphilippe.fr"
  },
  "repository": {
    "type": "MIT",
    "url": "https://github.com/lordfpx/AnotherBrick"
  },
  "license": "ISC",
  "devDependencies": {
    "browser-sync": "^2.9.11",
    "browserify": "^10.1.2",
    "chai": "^3.4.1",
    "del": "^2.2.0",
    "gulp": "^3.8.11",
    "gulp-jade": "^1.1.0",
    "gulp-jshint": "^1.11.2",
    "gulp-sass": "^2.0.0",
    "gulp-sequence": "^0.3.2",
    "gulp-sourcemaps": "^1.5.2",
    "gulp-streamify": "0.0.5",
    "gulp-uglify": "^1.2.0",
    "gulp-util": "^3.0.4",
    "gulp-watch": "^4.2.4",
    "jshint-stylish": "^2.1.0",
    "vinyl-source-stream": "^1.1.0",
    "watchify": "^3.2.1"
  },
  "dependencies": {
    "jquery": "^2.2.0"
  }
}

},{}],2:[function(require,module,exports){
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

},{"../../package.json":1,"../js/AB-deviceDetect":3,"../js/AB-easing":4,"../js/AB-equalizer":5,"../js/AB-fn":6,"../js/AB-imagesLoaded":7,"../js/AB-mediaQuery":8,"../js/AB-resizeEvent":9,"../js/AB-scrollTo":10}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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
    return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 *
      Math.PI) / p)) + b;
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
    return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) /
      p) + c + b;
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
    if (t < 1) return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t *
      d - s) * (2 * Math.PI) / p)) + b;
    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 *
      Math.PI) / p) * 0.5 + c + b;
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
    if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t -
      s)) + b;
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
    if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) *
      0.5 +
      b;
    return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * 0.5 + c *
      0.5 +
      b;
  }

};

module.exports = easing;

},{}],5:[function(require,module,exports){
"use strict";

/*
USAGE

*/

function Equalizer(selector) {
  if (!(this instanceof Equalizer)) {
    return new Equalizer(selector);
  }

  this.selector = selector;
  this.wrapper = $(selector);

  if (this.wrapper.length) {
    this.init();
  }
}

Equalizer.prototype = {
  init: function() {
    var that = this,
        $img = this.wrapper.find('img');

    if ($img.length) {
      AB.imagesLoaded($img, function() {
        that._equalize(that._getHeight());
        that._watch();
      });
      return;
    }

    this._equalize(this._getHeight());
    this._watch();
  },

  _watch: function() {
    var that = this,
        selector = this.selector,
        randomString = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

    randomString = AB.resizeEvent(selector, function(){
      that._equalize(that._getHeight());
    });
  },

  _getHeight: function() {
    var heights = [],
        $el = this.wrapper;
    for (var i = 0, len = $el.length; i < len; i++) {
      heights.push( $($el[i]).css('min-height', '').outerHeight() );
    }
    return Math.max.apply(null, heights);
  },

  _equalize: function(height) {
    this.wrapper.css('min-height', height);
    $(window).trigger('ab.equalizer.equalized', [this.wrapper, height]);
  },

  destroy: function() {
    $(window).off('rab.equalizer.equalized');
    this.wrapper.css('min-height', '');
  }
};

function equalizer(opt) {
  var $trigger = $('[data-ab-equalizer]');
  var $filtered = AB.fn.uniqueElByAttributeValue($trigger, 'data-ab-equalizer');

  for (var i = 0, len = $filtered.length; i < len; i++) {
    var selectorValue = $($filtered[i]).attr('data-ab-equalizer'),
        selector = '[data-ab-equalizer="'+ selectorValue +'"]';

    selectorValue = new Equalizer(selector);
  }
}

module.exports = equalizer;

},{}],6:[function(require,module,exports){
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

  // filter elements to keep only 1 elements with same attribute and value
  uniqueElByAttributeValue: function($elArray, attribute) {
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

};

module.exports = fn;

},{}],7:[function(require,module,exports){
"use strict";

/*
From https://github.com/zurb/foundation-sites

USAGE:

var imagesLoadedCallback = function() {
  console.log('imagesLoadedCallback: Images loaded');
};
AB.imagesLoaded( $('img'), imagesLoadedCallback );

*/

function imagesLoaded(images, callback) {
  var unloaded = images.length;

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
    var image = images[i];
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

    $(window).on('resize.ab.mediaquery', function() {
      newSize = that._getCurrentSize();

      if (newSize !== that.current) {
        $(window).trigger('changed.ab.mediaquery', [newSize, that.current]);
        that.current = newSize;
      }
    });
  },

  atLeast: function(size) {
    var query = this.get(size);

    if (query) {
      return window.matchMedia(query).matches;
    }

    return false;
  }
};

function mediaQuery(opt) {
  AB.mediaQuery = new MediaQuery(opt);
}

module.exports = mediaQuery;

},{}],9:[function(require,module,exports){
"use strict";

/*

Origin: http://manos.malihu.gr/event-based-jquery-element-resize/

USAGE

var someVariable = AB.resizeEvent('selector', function(){
  ... callback
});

*/

function ResizeEvent(el, callback) {
  if (!(this instanceof ResizeEvent)) {
    return new ResizeEvent(el, callback);
  }

  this.el = el;
  this.callback = callback;

  if (this.el.length) {
    this.init();
  }
}

ResizeEvent.prototype = {
  init: function() {
    var that = this,
        selector = this.el;

    [].forEach.call(document.querySelectorAll(selector), function(el) {
      el.mr = [el.offsetWidth,el.offsetHeight];
      el.insertAdjacentHTML("beforeend", "<div class='AB-resizeEvent-frame' style='position:absolute;width:auto;height:auto;top:0;right:0;bottom:0;left:0;margin:0;padding:0;overflow:hidden;visibility:hidden;z-index:-1'><iframe style='width:100%;height:0;border:0;visibility:visible;margin:0'></iframe><iframe style='width:0;height:100%;border:0;visibility:visible;margin:0'></iframe></div>");

      [].forEach.call(el.querySelectorAll(".AB-resizeEvent-frame iframe"), function(frame) {
        (frame.contentWindow || frame).onresize = function(){
          if (el.mr[0] !== el.offsetWidth || el.mr[1] !== el.offsetHeight) {
            if (that.callback) {
              that.callback.call(el);
            }
            el.mr[0] = el.offsetWidth;
            el.mr[1] = el.offsetHeight;
          }
        };
      });
    });
  }
};

function resizeEvent(el, callback) {
  AB.mediaQuery = new ResizeEvent(el, callback);
}

module.exports = resizeEvent;

},{}],10:[function(require,module,exports){
"use strict";

/*
USAGE

AB.scrollTo = new AB.scrollTo();

AB.scrollTo = new AB.scrollTo({
  duration: 1000,
  offset: 0,
  easing: 'swing'
});

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
      .off('click.ab.scrollTo')
      .on('click.ab.scrollTo', this.trigger, function(e) {
        e.preventDefault();
        var $this = $(this);

        if ($this.is('[data-ab-scrollto]')) {
          that.getTarget($this);
          return;
        }
        that.getAnchor(this);
      });
  },

  getTarget: function($el) {
    var $target = $($el.data('ab-scrollto'));
    if ($target.length) {
      this.scroll($target);
    }
  },

  getAnchor: function(el) {
    var location = window.location;

    if (location.pathname.replace(/^\//, '') === el.pathname.replace(/^\//, '') && location.hostname === el.hostname) {
      var $target = $(el.hash);
      $target = $target.length ? $target : $('[name=' + el.hash.slice(1) + ']');

      if ($target.length) {
        this.scroll($target);
      }
    }
  },

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
        $(document).trigger('ab.scrollTo.end', [$target]);
      }
    };

    requestAnimFrame(animateScroll);
  }
};

module.exports = function(opt) {
  return new ScrollTo(opt);
};

},{}]},{},[2]);
