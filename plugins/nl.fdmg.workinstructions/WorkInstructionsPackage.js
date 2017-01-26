import './scss/workinstructions.scss'
import WorkInstructionsComponent from './WorkInstructionsComponent';

export default {
  id: 'nl.fdmg.workinstructions',
  name: 'workinstructions',
  configure: function (config) {
    config.addComponentToSidebarWithTabId(this.id, 'main', WorkInstructionsComponent)
    config.addLabel('Edit workinstructions', {
      'nl': 'Werkinstructies aanpassen'
    })
    config.addLabel('Workinstructions placeholder', {
      'nl' : 'b.v. locatie en opmerkingen'
    })
    config.addLabel('Workinstructions', {
      'nl' : 'Werkinstructies'
    })
    config.addLabel('Article decoupled', {
      'nl' : 'Let op: ontkoppeld. Wijzigingen komen niet in de krant'
    })

    config.addLabel('Article coupled', {
      'nl' : 'Ontkoppel dit artikel'
    })
  }
}
