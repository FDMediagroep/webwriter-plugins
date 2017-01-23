import insertImageFromUrl from './insertImageFromUrl'
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
      insertImageFromUrl(tx, params.imageUrl)
    })
    api.editorSession.fileManager.sync()
    console.log('insertimagefromurlcommand')
  }
}

export default InsertImageUrlCommand
