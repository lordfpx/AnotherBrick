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
