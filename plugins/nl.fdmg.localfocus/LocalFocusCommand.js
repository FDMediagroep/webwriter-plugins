import { WriterCommand, api } from 'writer'
import insertEmbed from './insertEmbed'

class LocalFocusCommand extends WriterCommand {
  getCommandState() {
    return { disabled: true }
  }

  execute(params) {
    if (params.isPaste) {
      const currentNode = params.selection.getPath()
      if (!currentNode) {
        return false
      }
      const doc = params.editorSession.getDocument()
      api.document.deleteNode('localfocus', doc.get(currentNode[0]))
    }

    params.editorSession.transaction((tx) => {
      insertEmbed(tx, params.url)
    })
    return true
  }
}

export default LocalFocusCommand;