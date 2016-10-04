'use strict';

var InlineContentCommand = require('writer/commands/InlineContentCommand');

function StocktickerCommand() {
  StocktickerCommand.super.apply(this, arguments);
  this.name = 'stockticker';
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

    if (!state.disabled) {
      this.context.api.insertInlineNode(this.name, {
        dataType: 'fdmg/stockticker',
        isin: '',
        exchange: ''
      });
    }
  };
};

InlineContentCommand.extend(StocktickerCommand);

module.exports = StocktickerCommand;
