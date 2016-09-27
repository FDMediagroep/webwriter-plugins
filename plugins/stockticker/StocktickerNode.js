'use strict';
var InlineNode = require('substance/model/InlineNode');
var jQuery = require('substance/util/jquery');
var endpoint = 'http://beurs.fd.nl/webservices/fd/quicksearch?query=';
var searchUrl = 'http://localhost:5000/api/proxy?url=' + encodeURIComponent(endpoint);
function StocktickerNode() {
  StocktickerNode.super.apply(this, arguments);
  this.loadQuote(this.symbol, this.isin);
}
StocktickerNode.Prototype = function() {
  this.loadQuote = function(symbol, isin) {
    jQuery.ajax({
      url: searchUrl + isin,
      dataType: 'xml'
    }).done(function(data) {
      var node = this;
      var xmlQuote = $(data).find('quote').filter(function() {
        return $('ticker', this).text() === symbol && $('isin', this).text() === isin;
      });
      if (xmlQuote.length !== 1) return
      this.update(this.parseXMLQuote(xmlQuote));
    }.bind(this));
  }
  this.update = function(quote) {
    this.name = quote.name;
    this.symbol = quote.symbol;
    this.price = quote.price;
    this.difference = quote.difference;
    this.absdifference = quote.absdifference;
    this.currency = quote.currency;
    this.isin = quote.isin;
    this.exchange = quote.exchange;
    this.emit('stocktickernode:changed');
  }
  this.parseXMLQuote = function(xml) {
    return {
      name: xml.find('name').text(),
      symbol: xml.find('ticker').text(),
      price: xml.find('price').text(),
      difference: xml.find('difference').text(),
      absdifference: xml.find('absdifference').text(),
      currency: xml.find('currency').text(),
      isin: xml.find('isin').text(),
      exchange: xml.find('exchange').text()
    }
  }
}
InlineNode.extend(StocktickerNode);
StocktickerNode.static.defineSchema({
  dataType: 'string',
  symbol: {type: 'string', default: 'SYM'},
  price: {type: 'string', default: '0'},
  difference: {type: 'string', default: '0'},
  absdifference: {type: 'string', default: '0'},
  currency: {type: 'string', default: '!'},
  isin: {type: 'string', default: '0'},
  exchange: {type: 'string', default: 'EXC'}
})
module.exports = StocktickerNode;
