import TopstoryComponent from './TopstoryComponent'
import TopstoryValidator from './TopstoryValidator'

export default {
  id: 'nl.fdmg.topstory',
  name: 'topstory',
  configure: function(config) {
    config.addComponentToSidebarWithTabId(this.id, 'adminTab', TopstoryComponent)

    config.addValidator(TopstoryValidator)

    config.addLabel('Topstory', {
      'nl': 'Topstory'
    })

    config.addLabel('Topstory text', {
      'nl': 'Topstory (verplicht)'
    })

    config.addLabel('Topstory is missing a value', {
      'nl': 'Topstory mist een waarde'
    })
  }
}
