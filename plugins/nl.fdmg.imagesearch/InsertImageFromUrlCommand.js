import insertImageFromUrl from './InsertImageFromUrl'
import {api, WriterCommand} from 'writer'

/*
 */
class InsertImageUrlCommand extends WriterCommand {

  constructor(...args) {
    super(...args)
    this.name = 'insert-image-from-url'
  }

  execute(params) {
    api.editorSession.transaction((tx) => {
      insertImageFromUrl(tx, params.imageUrl, params.context.nodeId, params.context.nodeType)
    })
    api.editorSession.fileManager.sync()
  }
}

export default InsertImageUrlCommand
