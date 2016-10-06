'use strict';

module.exports = {

  type: 'localfocus',
  tagName: 'object',

  matchElement: function(el) {
    el.is('object[type="fdmg/localfocus"]');
  },

  import: function(el, node) {
    node.dataType = el.attr('type');
    node.url = el.attr('url');
  },

  export: function(node, el) {
    el.attr({
      type: node.dataType,
      url: node.url
    });
  }
};
