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


function Equalizer(opt) {
  if (!(this instanceof Equalizer)) {
    return new Equalizer(opt);
  }

  this.settings = $.extend({}, Equalizer.defaults, opt);

  this.el = $('[data-ab-equalizer]');
  this.filtered = uniqueElByAttributeValue(this.el, 'data-ab-equalizer');
  this.resizeEvent = {};

  this.init();
}

Equalizer.defaults = {};

Equalizer.prototype = {
  init: function() {
    var that = this,
        $filtered = this.filtered;

    for (var i = 0, len = $filtered.length; i < len; i++) {
      var selectorValue = $( $filtered[i] ).attr('data-ab-equalizer'),
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
    var that = this;

    AB.resizeEvent(selector, function(){
      that._equalize($el);
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
    $(window).trigger('ab.equalizer.equalized', [$el]);

    return this;
  }
};


module.exports = Equalizer;
