import {BlockNode} from 'substance'
import {api} from 'writer'
class TextframeNode extends BlockNode {

  getImageFile() {
    if (this.imageFile) {
      return this.document.get(this.imageFile)
    }
  }

  getUrl() {
    let imageFile = this.getImageFile()
    if (imageFile) {
      return imageFile.getUrl()
    }
  }

  setSoftcropData(data) {
    api.editorSession.transaction((tx) => {
      tx.set([this.id, 'crops'], data);
    })
  }

  setAlignment(alignment) {

    console.log('>>', alignment)
    api.editorSession.transaction((tx) => {
      tx.set([this.id, 'alignment'], alignment)
    }, {history: false})
  }

  handleDOMDocument(newsItemDOMDocument) {
    const dom = newsItemDOMDocument.documentElement,
      uuid = dom.getAttribute('guid'),
      uri = dom.querySelector('itemMeta > itemMetaExtProperty[type="imext:uri"]').getAttribute('value'),
      width = dom.querySelector('contentMeta > metadata > object > data > width'),
      height = dom.querySelector('contentMeta > metadata > object > data > height')

    api.editorSession.transaction((tx) => {
      tx.set([this.id, 'uuid'], uuid)
      tx.set([this.id, 'uri'], uri)
      tx.set([this.id, 'width'], width ? width.textContent : '')
      tx.set([this.id, 'height'], height ? height.textContent : '')
    }, {history: false})
  }
}

TextframeNode.define({
  type: 'textframe',
  dataType: {type: 'string', optional: false},
  imageFile: { type: 'file', optional: true },
  uuid: {type: 'string', optional: true},
  uri: { type: 'string', optional: true },

  title: {type: 'string', optional: false, default: '' },
  subject: {type: 'string', optional: false, default: '' },
  text: {type: 'string', optional: false, default: '' },
  alignment: {type: 'string', optional: false, default: ''},

  // ATTENTION: progress should not be part of the model
  // progress: {type: 'number', default: 100 },
  width: {type: 'number', optional: true },
  height: {type: 'number', optional: true },
  crops: { type: 'object', default: [] }
})

export default TextframeNode
