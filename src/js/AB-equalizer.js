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


/**
 * @module AB-equalizer
 * @desc
 * This plugin will allow you to equalize elements with data-ab-equalize. All elements with the same value will be equalized.
 *
 * @example
 * AB.init({
 *   equalizer: {}
 * });
 *
 * // Usage
 * <div data-ab-equalize="someID">
 *   Lorem ipsum dolor sit amet,
 *   consectetur adipisicing elit. Minima hic debitis ut consectetur.
 *   Molestias quod dolore veniam, rem nostrum modi nulla a, et veritatis,
 *   nobis quae error quidem illo ea.
 * </div>
 *
 * <div data-ab-equalize="someID">
 *   Lorem
 * </div>
 */
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
