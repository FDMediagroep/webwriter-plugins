import './scss/stockticker.scss'
import StocktickerNode from './StocktickerNode'
import StocktickerConverter from './StocktickerConverter'
import StocktickerComponent from './StocktickerComponent'
import StocktickerTool from './StocktickerTool'
import StocktickerCommand from './StocktickerCommand'
import StocktickerInlineTool from './StocktickerInlineTool'
import StocktickerInlineCommand from './StocktickerInlineCommand'

export default {
  id: 'nl.fdmg.stockticker',
  name: 'stockticker',

  configure: (config) => {

    config.addNode(StocktickerNode)
    config.addConverter('newsml', StocktickerConverter)
    config.addComponent('stockticker', StocktickerComponent)

    config.addContentMenuTopTool('stockticker', StocktickerTool)
    config.addCommand('stockticker', StocktickerCommand, {nodeType: 'stockticker'})

    config.addOverlayTool('stocktickerinline', StocktickerInlineTool)
    config.addCommand('stocktickerinline', StocktickerInlineCommand, {nodeType: 'stockticker'})
  }
}
