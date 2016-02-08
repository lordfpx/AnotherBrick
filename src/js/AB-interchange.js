"use strict";

/*
Heavily inspired by https://github.com/zurb/foundation-sites


*/


var Interchange = function(opt) {
  if (!(this instanceof Interchange)) {
    return new Interchange(opt);
  }

  this.settings = $.extend({}, Interchange.defaults, opt);

  this.$element = $('[data-ab-interchange]');
  this.rules = [];

  this.init();
  this.events();
};

Interchange.defaults = {
  rules: null
};

Interchange.prototype = {
  init: function() {
    this._generateRules();
    this._reflow();

    return this;
  },

  _generateRules: function() {
    var rulesList = [];
    var rules;

    if (this.settings.rules) {
      rules = this.settings.rules;
    }
    else {
      rules = this.$element.data('ab-interchange').match(/\[.*?\]/g);
    }

    for (var i=0, len=rules.length; i<len; i++) {
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
        currentQuery = AB.mediaQuery.current;

    // Iterate through each rule
    for (var i=0, len=this.rules.length; i<len; i++) {
      var rule = this.rules[i];

      if (rule.query === currentQuery) {
        this.replace(rule.path);
      }
    }
  },

  events: function() {
    $(window).on('resize.ab.interchange', this._reflow.bind(this));
  },

  replace: function(path) {
    if (this.currentPath === path) return;

    var _this = this,
        trigger = 'replaced.ab.interchange';

    // Replacing images
    if (this.$element[0].nodeName === 'IMG') {
      this.$element.attr('src', path).load(function() {
        _this.currentPath = path;
      })
      .trigger(trigger);
    }
    // Replacing background images
    else if (path.match(/\.(gif|jpg|jpeg|tiff|png)([?#].*)?/i)) {
      this.$element.css({ 'background-image': 'url('+path+')' })
          .trigger(trigger);
    }
    // Replacing HTML
    else {
      $.get(path, function(response) {
        _this.$element.html(response)
             .trigger(trigger);
        _this.currentPath = path;
      });
    }
  }
};

module.exports = Interchange;
