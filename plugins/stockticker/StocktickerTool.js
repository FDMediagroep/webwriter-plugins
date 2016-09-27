'use strict';
var SurfaceTool = require('substance/ui/SurfaceTool');
var Component = require('substance/ui/Component');
var $$ = Component.$$;
function StocktickerTool() {
  StocktickerTool.super.apply(this, arguments);
}
StocktickerTool.Prototype = function() {
  this.render = function() {
    return $$('button')
      .addClass('se-tool')
      .append(
        $$('i').addClass('fa fa-line-chart')
      ).on('click', this.insertStockticker);
  }
  this.insertStockticker = function() {
    var cmd = this.getCommand();
    cmd.insertStockticker();
  }
}
SurfaceTool.extend(StocktickerTool);
StocktickerTool.static.command = 'stockticker';
module.exports = StocktickerTool;
