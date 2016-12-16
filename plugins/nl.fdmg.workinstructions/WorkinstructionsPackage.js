import './scss/workinstructions.scss'
import WorkInstructionsComponent from './WorkInstructionsComponent';

export default {
  id: 'nl.fdmg.workinstructions',
  name: 'workinstructions',
  configure: function (config) {
    config.addComponentToSidebarWithTabId(this.id, 'main', WorkInstructionsComponent)
    config.addLabel('Workinstructions placeholder', {
      'nl' : 'b.v. locatie en opmerkingen'
    })
  }
}
