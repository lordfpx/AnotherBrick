"use strict";

/*
From https://github.com/zurb/foundation-sites

USAGE:

var imagesLoadedCallback = function() {
  console.log('imagesLoadedCallback: Images loaded');
};
AB.imagesLoaded( $('img'), imagesLoadedCallback );

*/

function imagesLoaded(images, callback) {
  var unloaded = images.length;

  if (unloaded === 0) {
    callback();
  }

  var singleImageLoaded = function() {
    unloaded--;
    if (unloaded === 0) {
      callback();
    }
  };

  for (var i = 0, len = unloaded; i < len; i++) {
    var image = images[i];
    if (image.complete) {
      singleImageLoaded();
    } else if (typeof image.naturalWidth !== 'undefined' && image.naturalWidth >
      0) {
      singleImageLoaded();
    } else {
      $(image).one('load', singleImageLoaded);
    }
  }
}

module.exports = imagesLoaded;
