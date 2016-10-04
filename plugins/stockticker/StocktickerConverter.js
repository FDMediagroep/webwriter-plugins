'use strict';

module.exports = {

  type: 'stockticker',
  tagName: 'span',

  matchElement: function(el) {
    return el.is('span[data-type="fdmg/stockticker"]');
  },

  import: function(el, node) {
    node.dataType = el.attr('data-type');
    node.isin = el.attr('data-isin-code');
    node.exchange = el.attr('data-exchange');
  },

  export: function(node, el) {
    el.attr({
      'data-type': node.dataType,
      'data-isin-code': node.isin,
      'data-exchange': node.exchange
    });
  }
};
