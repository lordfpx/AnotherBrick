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

