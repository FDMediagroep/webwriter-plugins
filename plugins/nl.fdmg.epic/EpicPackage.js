import EpicComponent from './EpicComponent'

export default {
  id: 'nl.fdmg.epic',
  name: 'epic',
  configure: function(config) {
    config.addComponentToSidebarWithTabId(this.id, 'main', EpicComponent)

    config.addLabel('Select epic', {
      'nl': 'Selecteer'
    })

    config.addLabel('Epic', {
      'nl': 'Het complete verhaal'
    })

    config.addLabel('Create', {
      'nl': 'Creëren'
    })
  }
}
