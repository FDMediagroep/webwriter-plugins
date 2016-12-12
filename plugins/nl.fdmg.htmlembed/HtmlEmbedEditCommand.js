import {WriterCommand, api} from 'writer'

class HtmlEmbedEditCommand extends WriterCommand {
  execute(params) {
    const data = {
      type: 'htmlembed',
      dataType: 'fdmg/htmlembed',
      text: params.text,
      format: 'html'
    }
    // FIXME FD compatible datatype

    return api.document.insertBlockNode(data.type, data)
  }
}

export default HtmlEmbedEditCommand
