import {WriterCommand, api} from 'writer'

class TextframeInsertImageCommand extends WriterCommand {

  constructor(...args) {
    super(...args)
    this.name = 'textframeinsertimage'
  }

  execute(params, context) {

    const textframeNode = params.context.node
    const editorSession = context.editorSession
    const file = params.data[0] // Textframe only supports one image, take the first one

    editorSession.transaction((tx) => {
      // Create file node for the image
      let imageFile = tx.create({
        parentNodeId: textframeNode.id,
        type: 'npfile',
        imType: 'x-im/image',
        mimeType: file.type,
        sourceFile: file
      })

      tx.set([textframeNode.id, 'imageFile'], imageFile.id)
    })

    api.editorSession.fileManager.sync()

  }
}
export default TextframeInsertImageCommand
