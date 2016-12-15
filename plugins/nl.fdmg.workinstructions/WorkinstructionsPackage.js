import './scss/workinstructions.scss'
import WorkinstructionsComponent from './WorkinstructionsComponent';

export default {
  id: 'nl.fdmg.workinstructions',
  name: 'workinstructions',
  configure: function (config) {
    config.addComponentToSidebarWithTabId(this.id, 'main', WorkinstructionsComponent)
    config.addLabel('Workinstruction placeholder', {
      'nl' : 'b.v. locatie en opmerkingen'
    })
  }
}
