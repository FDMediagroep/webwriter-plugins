'use strict';

var AnnotationComponent = require('substance/ui/AnnotationComponent');
var $$ = require('substance/ui/Component').$$;
var _vwdutil = require('./VWDUtil');
var VWDUtil = new _vwdutil();

function StocktickerComponent() {
  StocktickerComponent.super.apply(this, arguments);
  this.props.node.connect(this, {
    'stocktickernode:changed': this.onNodeChanged
  });
}

StocktickerComponent.Prototype = function() {

  this.didMount = function() {
    var node = this.props.node;

    this.loadQuote(node.isin, node.tickerName);
  }

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
        'data-ticker-name': node.tickerName,
        'data-external': 1,
        'contentEditable': false
      });
  }

  this.loadQuote = function(isin, tickerName) {
    var endpoint = this.context.api.router.getEndpoint() + '/api/proxy?url=';
    var searchUrl = this.context.api.getConfigValue('stockticker', 'serviceurl');

    VWDUtil.search(endpoint + encodeURIComponent(searchUrl) + isin, function(err, quotes) {
      if (err !== null) {
        console.log(err);
      } else {
        if (quotes.length === 1) {
          this.props.node.update(quote);
        } else {
          quotes = quotes.filter(function(quote) {return quote.tickerName === tickerName; });

          if (quotes.length !== 1) {
            console.log('No definite stockticker data found for isin ' + isin + ' with ticker name "' + tickerName + '" (' + quotes.length + ' results)');
          }

          if (quotes.length >= 1) {
            this.props.node.update(quotes[0]);
          }
        }
      }
    }.bind(this));
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
