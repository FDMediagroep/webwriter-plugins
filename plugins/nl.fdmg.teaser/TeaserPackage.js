import './scss/teaser.scss'
import teaserComponent from './teaserComponent'
import teaserConverter from './teaserConverter'
import teaser from './teaser'
import teaserTool from './teaserTool'
import teaserCommand from './teaserCommand'
import teaserInsertImageCommand from './teaserInsertImageCommand'

import {platform} from 'substance'
export default {
  name: 'ximteaser',
  id: 'nl.fdmg.teaser',
  configure: function (config, pluginConfig) {
    config.addNode(teaser)
    config.addComponent(teaser.type, teaserComponent)
    config.addConverter('newsml', teaserConverter)

    config.addContentMenuTopTool('ximteaser', teaserTool)
    config.addCommand('ximteaser', teaserCommand, pluginConfig)

    config.addCommand('teaserinsertimage', teaserInsertImageCommand, pluginConfig)

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
