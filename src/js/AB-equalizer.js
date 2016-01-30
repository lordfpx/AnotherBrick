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
      heights.push( $($el[i]).css('height', '').outerHeight(true) );
    }
    return Math.max.apply(null, heights);
  },

  _equalize: function(height) {
    this.wrapper.css('height', height);
    $(window).trigger('ab.equalizer.equalized', [this.wrapper, height]);
  },

  destroy: function() {
    $(window).off('rab.equalizer.equalized');
    this.wrapper.css('height', '');
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
