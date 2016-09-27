'use strict';
var SurfaceTool = require('substance/ui/SurfaceTool');
var $$ = require('substance/ui/Component').$$;
var jQuery = require('substance/util/jquery');
var SearchComponent = require('vendor/nl.fdmg/universalsearch/UniversalSearchComponent');
var endpoint = 'http://beurs.fd.nl/webservices/fd/quicksearch?query=';
var searchUrl = 'http://localhost:5000/api/proxy?url=' + encodeURIComponent(endpoint);
function StocktickerInlineTool() {
  StocktickerInlineTool.super.apply(this, arguments);
  var node = this.getStocktickerNode();
  if (!!node) {
    node.connect(this, {
      'stocktickernode:changed': this.onNodeChanged
    });
  }
}
StocktickerInlineTool.Prototype = function() {
  this.render = function() {
    var node = this.getStocktickerNode();
    if (!node) return $$('div');
    return $$('div')
      .addClass('se-tool')
      .addClass('sc-stockticker-inline-tool')
      .on('keydown', this.closeIfEscKeyPressed)
      .append(
        $$('h2').append(node.name ? node.name : 'search'),
        $$(SearchComponent, {
          doSearch: this.performSearch,
          onSelect: this.selectQuote.bind(this)
        })
      );
  }
  this.getStocktickerNode = function() {
    var doc = this.context.doc;
    if (this.props.annotationId) return doc.get(this.props.annotationId);
  }
  this.closeIfEscKeyPressed = function(e) {
    if (e.keyCode == 27 /* escape */) this.send('closeAnnotationTool');
  }
  this.performSearch = function(query, callback) {
    jQuery.ajax({
      url: searchUrl + query,
      dataType: 'xml'
    }).done(function(data) {
      var results = [];
      $(data).find('quote').each(function() {
        results.push({
          name: $('name', this).text(),
          symbol: $('ticker', this).text(),
          price: $('price', this).text(),
          difference: $('difference', this).text(),
          absdifference: $('absdifference', this).text(),
          currency: $('currency', this).text(),
          isin: $('isin', this).text(),
          exchange: $('exchange', this).text()
        });
      });
      callback(null, results);
    }).error(function(err) {
      callback(err, null);
    });
  }
  this.selectQuote = function(quote) {
    this.getStocktickerNode().update(quote);
    this.send('closeAnnotationTool'); // close tool when we have selected something
  }
  this.onNodeChanged = function() {
    this.rerender();
  }
}
SurfaceTool.extend(StocktickerInlineTool);
StocktickerInlineTool.static.name = 'stockticker-inline';
StocktickerInlineTool.static.command = 'stockticker-inline';
module.exports = StocktickerInlineTool;
