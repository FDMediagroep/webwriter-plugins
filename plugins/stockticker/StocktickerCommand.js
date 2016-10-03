'use strict';

var InlineContentCommand = require('writer/commands/InlineContentCommand');

function StocktickerCommand() {
  StocktickerCommand.super.apply(this, arguments);
}

StocktickerCommand.Prototype = function() {

  this.getCommandState = function() {
    var sel = this.getSelection();
    var newState = {
      disabled: true,
      active: false
    };
    if (sel && !sel.isNull() && sel.isPropertySelection()) {
      newState.disabled = false;
    }
    return newState;
  }

  this.insertStockticker = function() {
    var state = this.getCommandState();
    if (state.disabled) return;
    this.context.api.insertInlineNode('stockticker', { dataType: 'fdmg/stockticker' });
  }
}

InlineContentCommand.extend(StocktickerCommand);
module.exports = StocktickerCommand;
