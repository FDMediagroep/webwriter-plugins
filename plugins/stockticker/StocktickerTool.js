'use strict';

var SurfaceTool = require('substance/ui/SurfaceTool');
var $$ = require('substance/ui/Component').$$;

function StocktickerTool() {
  StocktickerTool.super.apply(this, arguments);
}

StocktickerTool.Prototype = function() {

  this.render = function() {
      return $$('button')
        .addClass('se-tool')
        .append($$('i').addClass('fa fa-line-chart'))
        .on('click', this.onClick)
  };

  this.onClick = function() {
    var command = this.getCommand();

    command.insertStockticker();
  }
};

SurfaceTool.extend(StocktickerTool);

StocktickerTool.static.command = 'stockticker';

module.exports = StocktickerTool;
