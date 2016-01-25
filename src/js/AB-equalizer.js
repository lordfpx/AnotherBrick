"use strict";

/*
USAGE

<div data-equalizer>
  <div data-equalizer-watch="test1">
    Lorem ipsum dolor sit amet,
    consectetur adipisicing elit. Minima hic debitis ut consectetur.
    Molestias quod dolore veniam, rem nostrum modi nulla a, et veritatis, nobis quae error quidem illo ea.
  </div>

  <div data-equalizer-watch="test1">
    Lorem
  </div>

  <div data-equalizer-watch="paragraph">
    Lorem ipsum dolor sit amet.
  </div>

  <div data-equalizer-watch="paragraph">
    Lorem nobis quae error quidem illo ea.Lorem nobis quae.
  </div>
</div>
*/

function Equalizer(el, opt) {
  if (!(this instanceof Equalizer)) {
    return new Equalizer(el, opt);
  }

  this.settings = $.extend({}, Equalizer.defaults, opt);
  this.wrapper = $(el);

  if (this.wrapper.length) {
    this.init();
  }
}

Equalizer.defaults = {
  watchers: '[data-ab-equalizer-watch]'
};

Equalizer.prototype = {

  init: function() {
    var $img = this.wrapper.find('img');
    var that = this;

    if ($img.length) {
      AB.imagesLoaded($img, function() {
        that._bindEvents();
        that._watch();
      });
      return;
    }

    this._bindEvents();
    this._watch();
  },

  _watch: function() {
    var that = this,
      $thisChild = this.wrapper.children(this.settings.watchers),
      $thisChildChild = $thisChild.children(this.settings.watchers);

    // First, treat the deepest level
    if ($thisChildChild.length) {
      this._checkWatchers($thisChildChild);
      setTimeout(that._checkWatchers($thisChild), 1);
    } else {
      this._checkWatchers($thisChild);
    }
  },

  _bindEvents: function() {
    var that = this,
      scrollTimeout;

    $(window).on('ab.equalizer.reinit', function() {
      that.init();
    });

    $(window).on('resize.ab.equalizer', function() {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
        scrollTimeout = null;
      }
      scrollTimeout = setTimeout(that.watch(), 250);
    });
  },

  _checkWatchers: function($watchers) {
    var that = this,
      dataArray = [],
      $watched;

    $.each($watchers.map(function() {
        return $(this).data('ab-equalizer-watch');
      }).get(),
      function(index, item) {
        if ($.inArray(item, dataArray) === -1) {
          dataArray.push(item);
          $watched = that.wrapper.find('[data-ab-equalizer-watch="' +
            item +
            '"]');
          that._equalize($watched, that._getHeight($watched));
        }
      });
  },

  _getHeight: function($el) {
    var heights = [];

    for (var i = 0, len = $el.length; i < len; i++) {
      heights.push($($el[i]).css('height', '').outerHeight());
    }

    return Math.max.apply(null, heights);
  },

  _equalize: function($group, height) {
    $group.innerHeight(height);
    $(window).trigger('ab.equalizer.equalized', [$group, height]);
  },

  destroy: function() {
    $(window).off('resize.ab.equalizer scroll.ab.equalizer');
  }

};

function equalizer(opt) {
  var el = $('[data-ab-equalizer]');

  for (var i = 0, len = el.length; i < len; i++) {
    $(el[i]).equalize = new Equalizer(el[i], opt);
  }
}

module.exports = equalizer;
