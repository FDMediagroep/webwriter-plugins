import FDPersonalComponent from './FDPersonalComponent'

export default {
  id: 'nl.fdmg.fdpersonal',
  name: 'fdpersonal',
  configure: function(config) {
    // config.addSidebarTab(this.id, 'Related')
    config.addComponentToSidebarWithTabId(this.id, 'main', FDPersonalComponent)

    config.addLabel('FD Personal', {
      'nl': 'FD Persoonlijk'
    })
  }
}
