'use strict';

function Stockticker() {}

Stockticker.prototype.schema = {
  name: 'stockticker',
  vendor: 'nl.fdmg',

  node: require('./StocktickerNode'),
  converter: require('./StocktickerConverter'),
  component: require('./StocktickerComponent'),

  tool: [
    require('./StocktickerTool'),
    require('./StocktickerInlineTool')
  ],

  command: [
    require('./StocktickerCommand'),
    require('./StocktickerInlineCommand')
  ]
};

module.exports = Stockticker;
