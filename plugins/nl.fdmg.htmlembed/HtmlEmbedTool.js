import {Tool} from 'substance'
import {api} from 'writer'

class HtmlEmbedTool extends Tool {
  render($$) {
    return $$('button')
      .addClass('se-tool')
      .attr({title: this.getLabel('Insert HTML embed')})
      .append($$('i').addClass('fa fa-code'))
      .on('click', this.insertEmbedHtml)
  }

  insertEmbedHtml() {
    api.editorSession.executeCommand('htmlembed', {})
  }
}

export default HtmlEmbedTool
