'use strict';

var SurfaceTool = require('substance/ui/SurfaceTool');
var $$ = require('substance/ui/Component').$$;
var SearchComponent = require('vendor/nl.fdmg/universalsearch/UniversalSearchComponent');
var VWDUtil = new (require('./VWDUtil'))();

function StocktickerInlineTool() {
  StocktickerInlineTool.super.apply(this, arguments);
  this.name = 'stockticker';
}

StocktickerInlineTool.Prototype = function() {

  this.render = function() {
    var node = this.getNode();
    var el = $$('div');

    if (node) {
      el
        .addClass('se-tool sc-stockticker-inline-tool')
        .append(
          $$(SearchComponent, {
            doSearch: this.performSearch.bind(this),
            onSelect: this.onSelect.bind(this)
          })
        )
        .on('keydown', this.onKeydown);
    }

    return el;
  };

  this.getNode = function() {
    var doc = this.context.doc;
    if (this.props.annotationId) {
      return doc.get(this.props.annotationId);
    }
  };

  this.onKeydown = function(e) {
    if (e.keyCode === 27 /* escape */) {
      this.send('closeAnnotationTool');
    }
  }

  this.performSearch = function(query, callback) {
    var endpoint = this.context.api.router.getEndpoint();
    var proxyEndpoint = endpoint + '/api/proxy?url=';
    var serviceUrl = this.context.api.getConfigValue(this.name, 'serviceurl');
    var searchUrl = proxyEndpoint + encodeURIComponent(serviceUrl + query);

    VWDUtil.search(searchUrl, callback);
  }

  this.onSelect = function(quote) {
    this.getNode().update(quote.isin, quote.exchange);
    this.send('closeAnnotationTool');
  }
}

SurfaceTool.extend(StocktickerInlineTool);

StocktickerInlineTool.static.name = 'stockticker-inline';
StocktickerInlineTool.static.command = 'stockticker-inline';

module.exports = StocktickerInlineTool;
