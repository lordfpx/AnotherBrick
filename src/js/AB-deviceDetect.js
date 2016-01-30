"use strict";

/*
USAGE

AB.deviceDetect.get('browser', 'any');
=> return true or false

AB.deviceDetect.isTouch();
=> return true on touch devices
*/

var deviceDetect = {
  browser: {
    Android: function(userAgent, appVersion) {
      return userAgent.match(/Android/i) ? true : false;
    },
    BlackBerry: function(userAgent, appVersion) {
      return userAgent.match(/BlackBerry/i) ? true : false;
    },
    iOS: function(userAgent, appVersion) {
      return userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    },
    Windows: function(userAgent, appVersion) {
      return userAgent.match(/IEMobile/i) ? true : false;
    },
    any: function(userAgent, appVersion) {
      return  (this.Android(userAgent, appVersion) ||
              this.BlackBerry(userAgent, appVersion) ||
              this.iOS(userAgent, appVersion) ||
              this.Windows(userAgent, appVersion));
    }
  },

  OS: {
    iOS: function(userAgent, appVersion) {
      return appVersion.match(/iPhone|iPod/i) ? true : false;
    },
    Android: function(userAgent, appVersion) {
      return appVersion.match(/Android/i) ? true : false;
    },
    Windows: function(userAgent, appVersion) {
      return appVersion.match(/Windows NT/i) ? true : false;
    }
  },

  // https://ctrlq.org/code/19616-detect-touch-screen-javascript
  isTouch: function() {
    return  (('ontouchstart' in window) ||
            (navigator.MaxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
  },

  get: function(type, device) {
    var userAgent = navigator.userAgent,
        appVersion = navigator.appVersion;

    return this[type][device](userAgent, appVersion);
  }
};

module.exports = deviceDetect;
