'use strict';

var InlineNode = require('substance/model/InlineNode');
var jQuery = require('substance/util/jquery');

function StocktickerNode() {
  StocktickerNode.super.apply(this, arguments);
}

StocktickerNode.Prototype = function() {

  this.update = function(quote) {
    this.tickerName = quote.tickerName;
    this.symbol = quote.symbol;
    this.price = quote.price;
    this.difference = quote.difference;
    this.absdifference = quote.absdifference;
    this.currency = quote.currency;
    this.isin = quote.isin;
    this.exchange = quote.exchange;

    this.emit('stocktickernode:changed');
  }
}

InlineNode.extend(StocktickerNode);

StocktickerNode.static.defineSchema({
  dataType: 'string',
  tickerName: { type: 'string', default: '' },
  symbol: {type: 'string', default: 'SYM'},
  price: {type: 'string', default: '0'},
  difference: {type: 'string', default: '0'},
  absdifference: {type: 'string', default: '0'},
  currency: {type: 'string', default: '!'},
  isin: {type: 'string', default: '0'},
  exchange: {type: 'string', default: 'EXC'}
})

module.exports = StocktickerNode;
