import './scss/teaser.scss'
import TeaserComponent from './TeaserComponent'
import TeaserConverter from './TeaserConverter'
import Teaser from './Teaser'
import TeaserTool from './TeaserTool'
import TeaserCommand from './TeaserCommand'
import TeaserInsertImageCommand from './TeaserInsertImageCommand'

import {platform} from 'substance'
export default {
  name: 'ximteaser',
  id: 'nl.fdmg.teaser',
  configure: function (config, pluginConfig) {
    config.addNode(Teaser)
    config.addComponent(Teaser.type, TeaserComponent)
    config.addConverter('newsml', TeaserConverter)

    config.addContentMenuTopTool('ximteaser', TeaserTool)
    config.addCommand('ximteaser', TeaserCommand, pluginConfig)

    config.addCommand('teaserinsertimage', TeaserInsertImageCommand, pluginConfig)

    config.addIcon('ximteaser', { 'fontawesome': ' fa-newspaper-o' })


    if (platform.isMac) {
      config.addKeyboardShortcut('cmd+alt+t', { command: 'ximteaser' })
    } else {
      config.addKeyboardShortcut('ctrl+alt+t', { command: 'ximteaser' })
    }

    config.addLabel('Insert Teaser', {
      en: 'Insert Teaser',
      sv: 'Infoga puff'
    })
  }
}
