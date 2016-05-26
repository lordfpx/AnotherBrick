"use strict";

var fn = {

  // can a string be a JSON parsed?
  isJson: function(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  },

  // extend objects
  extend: function(){
    for(var i=1; i<arguments.length; i++) {
      for(var key in arguments[i]) {
        if(arguments[i].hasOwnProperty(key)) {
          arguments[0][key] = arguments[i][key];
        }
      }
    }
    return arguments[0];
  },

  // element.matches(selector) with browser prefixes
  // usage: AB.fn.selectorMatches(element, selector)
  selectorMatches: function(el, selector) {
  	var p = Element.prototype;
  	var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function(s) {
  		return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
  	};
  	return f.call(el, selector);
  }

};

module.exports = fn;
