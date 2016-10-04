'use strict';

var AnnotationComponent = require('substance/ui/AnnotationComponent');
var $$ = require('substance/ui/Component').$$;
var VWDUtil = new (require('./VWDUtil'))();

function StocktickerComponent() {
  StocktickerComponent.super.apply(this, arguments);
  this.name = 'stockticker';

  this.props.node.connect(this, {
    'stocktickernode:changed': this.onNodeChanged
  });
}

StocktickerComponent.Prototype = function() {

  this.getInitialState = function() {
    return {
      symbol: '',
      currency: '',
      price: '',
      difference: ''
    };
  };

  this.didMount = function() {
    this.load(this.props.node.isin, this.props.node.exchange);
  };

  this.render = function() {
    var el = $$('span')
      .addClass('sc-stockticker');

    if (this.state.symbol)
    {
      el.append(
        this.state.symbol,
        $$('span')
          .addClass(parseFloat(this.state.difference) >= 0 ? 'up' : 'down')
          .append(
            this.state.currency,
            this.state.price,
            ' ',
            '(' + this.state.difference + ')'
          )
      )
      .on('click', this.onClick)
      .attr({
        'data-type': this.props.node.dataType,
        'data-isin-code': this.props.node.isin,
        'data-exchange': this.props.node.exchange
      });
    }

    return el;
  };

  this.onClick = function(e) {
    e.preventDefault();
    e.stopPropagation();

    var node = this.props.node;
    var surface = this.context.surface;

    surface.setSelection(node.getSelection());
  };

  this.load = function(isin, exchange) {
    var endpoint = this.context.api.router.getEndpoint();
    var proxyEndpoint = endpoint + '/api/proxy?url=';
    var serviceUrl = this.context.api.getConfigValue(this.name, 'serviceurl');
    var searchUrl = proxyEndpoint + encodeURIComponent(serviceUrl + isin);

    VWDUtil.search(searchUrl, function(err, quotes) {
      if (err !== null) {
        console.log(err);
        return;
      }

      quotes = quotes.filter(function(q) {
        return q.exchange === exchange;
      }.bind(this));

      if (quotes.length === 1) {
        var quote = quotes.pop();

        this.extendState({
          symbol: quote.symbol,
          currency: quote.currency,
          price: quote.price,
          difference: quote.difference
        });
      } else {
        console.log('No definite stockticker data found for isin ' + isin + ' with exchange "' + exchange + '" (' + quotes.length + ' results)');
      }

    }.bind(this));
  };

  this.onNodeChanged = function() {
    this.load(this.props.node.isin, this.props.node.exchange);
  }

  this.dispose = function() {
    var doc = this.props.doc;
    doc.disconnect(this);
  }
};

AnnotationComponent.extend(StocktickerComponent);

module.exports = StocktickerComponent;
