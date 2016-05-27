"use strict";

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
