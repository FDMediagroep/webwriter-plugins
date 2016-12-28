import './scss/textframe.scss'
import TextframeComponent from './TextframeComponent'
import TextframeConverter from './TextframeConverter'
import TextframeNode from './TextframeNode'
import TextframeTool from './TextframeTool'
import TextframeCommand from './TextframeCommand'
import TextframeInsertImageCommand from './TextframeInsertImageCommand'
import TextframeValidator from './TextframeValidator'

export default {
  name: 'textframe',
  id: 'nl.fdmg.textframe',
  configure: function (config, pluginConfig) {
    config.addNode(TextframeNode)
    config.addComponent(TextframeNode.type, TextframeComponent)
    config.addConverter('newsml', TextframeConverter)

    config.addContentMenuTopTool('textframe', TextframeTool)
    config.addCommand('textframe', TextframeCommand, pluginConfig)

    config.addCommand('textframeinsertimage', TextframeInsertImageCommand, pluginConfig)

    config.addIcon('textframe', { 'fontawesome': 'fa-tumblr' })

    // if (platform.isMac) {
    //   config.addKeyboardShortcut('cmd+alt+t', { command: 'textframe' })
    // } else {
    //   config.addKeyboardShortcut('ctrl+alt+t', { command: 'textframe' })
    // }

    config.addLabel('Textframe', {
      nl: 'Tekstkader'
    })

    config.addLabel('Insert Textframe', {
      nl: 'Tekstkader invoegen'
    })

    config.addLabel('Upload image', {
      nl: 'Afbeelding uploaden'
    })

    config.addLabel('Missing textframe text', {
      nl: 'Tekst ontbreekt in tekstkader'
    })

    config.addValidator(TextframeValidator)
  }
}
