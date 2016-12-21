import {InsertInlineNodeCommand} from 'substance'

class StocktickerCommand extends InsertInlineNodeCommand {
  getCommandState(params) {
    if (!params) return

    const sel = params.selection
    const newState = {
      disabled: true,
      active: false
    }

    if (sel && !sel.isNull() && sel.isPropertySelection()) {
      newState.disabled = false
    }

    return newState
  }

  createNodeData() {
    return {
      attributes: {'data-isin-code': 'US0378331005'},
      target: [],
      label: '???',
      type: 'stockticker',
      dataType: 'fdmg/stockticker',
      isin: 'US0378331005',
      exchange: 'XNAS'
    }
  }
}

export default StocktickerCommand
