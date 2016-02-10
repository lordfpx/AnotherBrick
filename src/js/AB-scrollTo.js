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
        $(document).trigger('scrolled.ab-scrollTo', [$target]);
      }
    };

    requestAnimFrame(animateScroll);
  }
};

module.exports = ScrollTo;
