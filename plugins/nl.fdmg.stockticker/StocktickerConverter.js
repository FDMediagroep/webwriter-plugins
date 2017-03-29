export default {
  type: 'stockticker',
  tagName: 'span',

  matchElement: (el) => {
    return el.is('span[data-type="fdmg/stockticker"]');
  },

  import: (el, node) => {
    node.dataType = el.attr('data-type');
    node.isin = el.attr('data-isin-code');
    node.exchange = el.attr('data-exchange');
    node.price = el.attr('data-price');
    node.difference = el.attr('data-difference');
    node.name = el.attr('data-name');
  },

  export: (node, el) => {
    el.attr({
      'data-type': node.dataType,
      'data-isin-code': node.isin,
      'data-exchange': node.exchange,
      'data-price': node.price,
      'data-difference': node.difference,
      'data-name': node.name
    });
  }
}