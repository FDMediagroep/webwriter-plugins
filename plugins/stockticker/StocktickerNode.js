'use strict';

var InlineNode = require('substance/model/InlineNode');

function StocktickerNode() {
  StocktickerNode.super.apply(this, arguments);
}

StocktickerNode.Prototype = function() {

  this.update = function(isin, exchange) {
    this.isin = isin;
    this.exchange = exchange;

    this.emit('stocktickernode:changed');
  }
}

InlineNode.extend(StocktickerNode);

StocktickerNode.static.defineSchema({
  dataType: 'string',
  isin: 'string',
  exchange: 'string'
});

module.exports = StocktickerNode;
