import {Tool} from 'substance';
import {api} from 'writer';

export default class HtmlEmbedTool extends Tool {
  render($$) {
    return $$('button')
      .addClass('se-tool')
      .append($$('i').addClass('fa fa-code'))
      .attr('title', this.getLabel('Insert html-embed'))
      .on('click', this.insertEmbedHtml);
  }

  insertEmbedHtml() {
    api.editorSession.executeCommand('htmlembed', {});
  }
}

