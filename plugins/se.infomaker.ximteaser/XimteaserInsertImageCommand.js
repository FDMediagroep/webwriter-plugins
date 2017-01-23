import {WriterCommand, api} from 'writer'

class XimteaserInsertImageCommand extends WriterCommand {

  constructor(...args) {
    super(...args)
    this.name = 'ximteaserinsertimage'
  }

  execute(params, context) {

    const node = params.context.node
    const editorSession = context.editorSession
    const file = params.data[0] // Teaser only supports one image, take the first one

    editorSession.transaction((tx) => {
        // Create file node for the image
      let imageFile = tx.create({
        parentNodeId: node.id,
        type: 'npfile',
        imType: 'x-im/image',
        mimeType: file.type,
        sourceFile: file
      })

      tx.set([node.id, 'imageFile'], imageFile.id)
    })

    api.editorSession.fileManager.sync()

  }
}
export default XimteaserInsertImageCommand
