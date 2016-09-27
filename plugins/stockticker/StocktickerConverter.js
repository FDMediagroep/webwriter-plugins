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
    node.name = el.attr('data-ticker-name');
    node.isin = el.attr('data-isin-code');
  },
  export: function(stockticker, el) {
    el.html(stockticker.symbol);
    el.removeAttr('data-id');
    el.attr({
      'data-type': stockticker.dataType,
      'data-ticker-name': stockticker.name,
      'data-isin-code': stockticker.isin
    });
  }
}
