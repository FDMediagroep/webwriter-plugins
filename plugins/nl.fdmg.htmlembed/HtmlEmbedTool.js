import {Tool} from 'substance'
import {api} from 'writer'

class HtmlEmbedTool extends Tool {
  insertEmbedHtml() {
    api.editorSession.executeCommand('htmlembed', {})
  }

  render($$) {
    const el = $$('button')
      .addClass('se-tool')
      .attr('title', this.getLabel('Insert HTML embed'))
      .append($$('i').addClass('fa fa-code'))
      .on('click', this.insertEmbedHtml)

    return el
  }
}

export default HtmlEmbedTool
