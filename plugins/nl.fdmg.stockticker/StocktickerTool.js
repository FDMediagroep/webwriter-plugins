import {Tool} from 'substance';
import {api} from 'writer';

class StocktickerTool extends Tool {

  render($$) {
    return $$('button')
      .addClass('se-tool')
      .attr('title', this.getLabel('Insert Stockticker'))
      .append($$('i').addClass('fa fa-line-chart'))
      .on('click', this.insertStockticker);
  }

  insertStockticker() {
    api.editorSession.executeCommand('stockticker');
  }
}

export default StocktickerTool;
