import LocalFocusNode from './LocalFocusNode'
import LocalFocusCommand from './LocalFocusCommand'
import LocalFocusComponent from './LocalFocusComponent'
import LocalFocusConverter from './LocalFocusConverter'
import LocalFocusMacro from './LocalFocusMacro'
import LocalFocusDrop from './LocalFocusDrop'

export default {
  id: 'nl.fdmg.localfocus',
  name: 'localfocus',

  configure: function(config) {

    config.addNode(LocalFocusNode)
    config.addCommand('localfocus', LocalFocusCommand)
    config.addComponent(LocalFocusNode.type, LocalFocusComponent)
    config.addConverter('newsml', LocalFocusConverter)
    config.addMacro(LocalFocusMacro)
    config.addDragAndDrop(LocalFocusDrop)
  }
}
