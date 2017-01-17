import {WriterCommand, api, idGenerator} from 'writer'

class teaserCommand extends WriterCommand {


  execute(params, context) {
    const teaserPosition = context.api.getConfigValue(this.config.id, 'teaserPosition', 'top')
    console.log(teaserPosition)
    const nodes = api.document.getDocumentNodes()
    const existingTeaser = nodes.filter((node) => {
      return node.dataType === 'x-im/teaser'
    })
    if(existingTeaser.length > 0) {
      api.ui.showNotification('nl.fdmg.teaser', api.getLabel('A teaser already exist'), api.getLabel('There is already a teaser in this document'))
      return false
    }

    switch (teaserPosition) {
      case 'top':
        this.insertTeaserAtTop(params)
        break

      default:
        this.insertTeaserAtBottom(params)
        break
    }

  }

  /**
   * Insert an empty teaser at top of the document
   * @param params
   */
  insertTeaserAtTop(params) {
    const editorSession = params.editorSession
    const doc = editorSession.getDocument()

    editorSession.transaction((tx) => {

      // Select the first node to the selection
      const firstNodeId = doc.getNodes()['body'].nodes[0];
      console.log(firstNodeId)
      tx.selection = doc.createSelection({
        type: 'property',
        containerId: 'body',
        path: [firstNodeId, 'content'],
        startOffset: 0
      })
      tx.insertBlockNode(this.getEmptyTeaserNode())

    })
  }


  /**
   * Insert an empty teaser at bottom of the document
   * @param params
   */
  insertTeaserAtBottom(params) {
    const editorSession = params.editorSession
    editorSession.transaction((tx) => {
      const body = tx.get('body');
      const node = tx.create(this.getEmptyTeaserNode());
      body.show(node.id);
    })
  }

  /**
   * Get an empty object for a teaser node
   * @returns {{type: string, dataType: string, id: *, uuid: string, url: string, imageType: string, title: string, text: string}}
   */
  getEmptyTeaserNode() {

    return {
      type: 'ximteaser',
      dataType: 'x-im/teaser',
      id: idGenerator(),
      uuid: '',
      url: '',
      imageType: 'x-im/image',
      title: "Teaserkop - toont op home (optioneel)",
      text: "Teaserintro - toont op home (verplicht)",
      crops: []
    }

  }

}
export default teaserCommand
