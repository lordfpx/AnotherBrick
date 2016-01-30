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

  // filter elements to keep only 1 elements with same attribute and value
  uniqueElByAttributeValue: function($elArray, attribute) {
    var obj = {},
        category;

    var filteredEl = $elArray.filter(function(){
      category = $(this).attr(attribute);
      if(obj[category]){
        return false;
      } else {
        obj[category] = true;
        return true;
      }
    });

    return filteredEl;
  }

};

module.exports = fn;
