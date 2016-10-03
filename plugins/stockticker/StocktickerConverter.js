
'use strict';

module.exports = {

  type: 'stockticker',
  tagName: 'span',

  matchElement: function(el) {
    return el.is('span[data-type="fdmg/stockticker"]');
  },

  import: function(el, node, converter) {
    node.symbol = el.text();
    node.dataType = el.attr('data-type');
    node.tickerName = el.attr('data-ticker-name');
    node.isin = el.attr('data-isin-code');
  },

  export: function(stockticker, el) {
    el.html(stockticker.symbol);
    el.removeAttr('data-id');
    el.attr({
      'data-type': stockticker.dataType,
      'data-ticker-name': stockticker.tickerName,
      'data-isin-code': stockticker.isin
    });
  }
}
