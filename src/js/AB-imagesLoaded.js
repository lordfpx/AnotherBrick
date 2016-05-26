"use strict";

/**
 * @module AB-imagesLoaded
 * @desc
 * You can run a callback when images inside of an element are loaded.
 * That can be useful after ajax response.
 * Heavily inspired by {@link https://github.com/zurb/foundation-sites}
 *
 * @example
 * var imagesLoadedCallback = function() {
 *   console.log('imagesLoadedCallback: Images loaded');
 * };
 * AB.imagesLoaded( '.some-element-wrapper', imagesLoadedCallback );
 */

function imagesLoaded(wrapper, callback) {
  var images = document.querySelectorAll(wrapper + " img"),
      unloaded = images.length;

  if (unloaded === 0) callback();

  var singleImageLoaded = function() {
    unloaded--;
    if (unloaded === 0) callback();
  };

  for (var i = 0; i < unloaded; i++) {
    var image = images[i];

    if (image.complete) {
      singleImageLoaded();
    } else if (typeof image.naturalWidth !== 'undefined' && image.naturalWidth > 0) {
      singleImageLoaded();
    } else {
      image.addEventListener('load', singleImageLoaded);
    }
  }
}

module.exports = imagesLoaded;
