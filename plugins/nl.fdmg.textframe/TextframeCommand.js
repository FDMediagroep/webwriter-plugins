import {WriterCommand, api, idGenerator} from 'writer'

class TextframeCommand extends WriterCommand {

  execute() {
    const node = this.getEmptyTextframeNode();

    return api.document.insertBlockNode(node.type, node)
  }

  /**
   * Get an empty object for a textframe node
   * @returns {{type: string, dataType: string, id: *, uuid: string, url: string, imageType: string, title: string, text: string}}
   */
  getEmptyTextframeNode() {

    return {
      type: 'textframe',
      dataType: 'fdmg/textframe',
      id: idGenerator(),
      uuid: '',
      url: '',
      imageType: 'x-im/image',
      title: '',
      text: '',
      crops: []
    }
  }
}

export default TextframeCommand
