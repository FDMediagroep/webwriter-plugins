'use strict';
var AnnotationComponent = require('substance/ui/AnnotationComponent');
var $$ = require('substance/ui/Component').$$;
function StocktickerComponent() {
  StocktickerComponent.super.apply(this, arguments);
  this.props.node.connect(this, {
    'stocktickernode:changed': this.onNodeChanged
  });
}
StocktickerComponent.Prototype = function() {
  this.render = function() {
    var node = this.props.node;
    return $$('span')
      .addClass('sc-stockticker')
      .on('click', this.selectStockticker)
      .append(
        node.symbol,
        $$('span')
          .addClass(parseFloat(node.difference) >= 0 ? 'up' : 'down')
          .append(node.currency, node.price, '(' + node.difference + ')')
      )
      .attr({
        'data-type': node.dataType,
        'data-symbol': node.symbol,
        'data-isin-code': node.isin,
        'data-ticker-name': node.name,
        'data-external': 1,
        'contentEditable': false
      });
  }
  this.selectStockticker = function(e) {
    e.preventDefault();
    e.stopPropagation();
    var node = this.props.node;
    var surface = this.context.surface;
    surface.setSelection(node.getSelection());
  }
  this.onNodeChanged = function() {
    this.rerender();
  }
  this.dispose = function() {
    var doc = this.props.doc;
    doc.disconnect(this);
  }
}
AnnotationComponent.extend(StocktickerComponent);
module.exports = StocktickerComponent;
