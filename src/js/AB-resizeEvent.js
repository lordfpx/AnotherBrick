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
        selector = this.el,
        timeout = false,
        delay = 200; // delay the callback

    [].forEach.call(document.querySelectorAll(selector), function(el) {
      el.mr = [el.offsetWidth, el.offsetHeight];
      el.insertAdjacentHTML("beforeend", "<div class='AB-resizeEvent-frame' style='position:absolute;width:auto;height:auto;top:0;right:0;bottom:0;left:0;margin:0;padding:0;overflow:hidden;visibility:hidden;z-index:-1'><iframe style='width:100%;height:0;border:0;visibility:visible;margin:0'></iframe><iframe style='width:0;height:100%;border:0;visibility:visible;margin:0'></iframe></div>");
      if (el.style.position === "static" || el.style.position === "") {
        el.style.position = "relative";
      }
      [].forEach.call(el.querySelectorAll(".AB-resizeEvent-frame iframe"), function(frame) {
        (frame.contentWindow || frame).onresize = function() {
          clearTimeout(timeout);
          timeout = setTimeout(function(){
            if (el.mr[0] !== el.offsetWidth || el.mr[1] !== el.offsetHeight) {
              if (that.callback) {
                that.callback.call(el);
              }
              el.mr[0] = el.offsetWidth;
              el.mr[1] = el.offsetHeight;
            }
          }, delay);
        };
      });
    });
  }
};

function resizeEvent(el, callback) {
  AB.mediaQuery = new ResizeEvent(el, callback);
}

module.exports = resizeEvent;
