import {Tool} from 'substance';
import {api} from 'writer';

class StocktickerTool extends Tool {

  render($$) {
    const el = $$('button')
      .addClass('se-tool')
      .attr('title', this.getLabel('Insert Stockticker'))
      .append($$('i').addClass('fa fa-line-chart'))
      .on('click',() => api.editorSession.executeCommand('stockticker'));

    return el;
  }

}

export default StocktickerTool;
