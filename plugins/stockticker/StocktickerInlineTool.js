'use strict';

var SurfaceTool = require('substance/ui/SurfaceTool');
var $$ = require('substance/ui/Component').$$;
var _vwdutil = require('./VWDUtil');
var VWDUtil = new _vwdutil();
var SearchComponent = require('vendor/nl.fdmg/universalsearch/UniversalSearchComponent');

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
          doSearch: this.performSearch.bind(this),
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
    var endpoint = this.context.api.router.getEndpoint() + '/api/proxy?url=';
    var searchUrl = this.context.api.getConfigValue('stockticker', 'serviceurl');

    VWDUtil.search(endpoint + encodeURIComponent(searchUrl) + query, callback);
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
