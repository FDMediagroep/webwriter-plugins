import HtmlEmbedTool from './HtmlEmbedTool'
import HtmlEmbedCommand from './HtmlEmbedCommand'
import HtmlEmbedEditCommand from './HtmlEmbedEditCommand'
import HtmlEmbedNode from './HtmlEmbedNode'
import HtmlEmbedComponent from './HtmlEmbedComponent'
import HtmlEmbedConverter from './HtmlEmbedConverter'
import {platform} from 'substance'

export default {
  id: 'nl.fdmg.htmlembed',
  name: 'htmlembed',
  configure: function(config) {

    config.addContentMenuTopTool(this.name, HtmlEmbedTool)

    config.addCommand(this.name, HtmlEmbedCommand)
    config.addCommand('htmlembededit', HtmlEmbedEditCommand)

    config.addNode(HtmlEmbedNode)

    config.addComponent(this.name, HtmlEmbedComponent)

    config.addConverter('newsml', HtmlEmbedConverter)

    config.addLabel('Edit embed code', {nl: 'Invoeg code aanpassed'})

    if (platform.isMac) {
      config.addKeyboardShortcut('cmd+alt+h', {command: 'htmlembed'})
    } else {
      config.addKeyboardShortcut('ctrl+alt+h', {command: 'htmlembed'})
    }
  }
}
