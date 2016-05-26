"use strict";

/**
 * @module AB-interchange
 * @desc
 * While responsive image loading is not really an easy task still today, here is a solution
 * to manage conditional (based on breakpoints) loading of img, background-image or even HTML content with that plugin.
 * Heavily inspired by {@link https://github.com/zurb/foundation-sites}
 *
 * @example
 * // loading of img source:
 * <img src="" data-ab-interchange="[img/cat-1x.jpg, small], [img/cat-2x.jpg, medium], [img/cat-3x.jpg, large]">
 *
 * // background-image:
 * <div data-ab-interchange="[img/cat-1x.jpg, small], [img/cat-2x.jpg, medium], [img/cat-3x.jpg, large]"></div>
 */
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
