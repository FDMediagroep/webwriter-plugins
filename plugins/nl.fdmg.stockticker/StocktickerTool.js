import {Tool} from 'substance';
import {api} from 'writer';

export default class StocktickerTool extends Tool {
  
  render($$) {
    return $$('button')
      .addClass('se-tool')
      .attr('title', this.getLabel('Insert Stockticker'))
      .append($$('i').addClass('fa fa-line-chart'))
      .on('click', this.onClick);
  }

  onClick() {
    api.editorSession.executeCommand('stockticker');
  }
}
