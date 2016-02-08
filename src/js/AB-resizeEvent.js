"use strict";

/*

Origin: http://manos.malihu.gr/event-based-jquery-element-resize/

USAGE

AB.resizeEvent('selector', function(){
  ... callback
});

*/

function resizeEvent(selector, callback) {
  var timeout = false,
      delay = 100; // delay the callback

  if (typeof selector !== 'undefined') {
    [].forEach.call(document.querySelectorAll(selector), function(el) {
      el.mr = [el.offsetWidth, el.offsetHeight];
      el.insertAdjacentHTML(
        "beforeend",
        "<div class='AB-resizeEvent-frame' style='position:absolute;width:auto;height:auto;top:0;right:0;bottom:0;left:0;margin:0;padding:0;overflow:hidden;visibility:hidden;z-index:-1'><iframe style='width:100%;height:0;border:0;visibility:visible;margin:0'></iframe><iframe style='width:0;height:100%;border:0;visibility:visible;margin:0'></iframe></div>"
      );

      if (el.style.position === "static" || el.style.position === "") {
        el.style.position = "relative";
      }

      [].forEach.call(el.querySelectorAll(".AB-resizeEvent-frame iframe"), function(frame) {
        (frame.contentWindow || frame).onresize = function() {
          clearTimeout(timeout);

          timeout = setTimeout(function(){
            if (el.mr[0] !== el.offsetWidth || el.mr[1] !== el.offsetHeight) {
              if (callback) {
                callback.call(el);
              }
              el.mr[0] = el.offsetWidth;
              el.mr[1] = el.offsetHeight;
            }
          }, delay);
        };
      });
    });
  }

}

module.exports = resizeEvent;
