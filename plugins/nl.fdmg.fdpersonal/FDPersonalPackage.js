import FDPersonalComponent from './FDPersonalComponent'

export default {
  id: 'nl.fdmg.fdpersonal',
  name: 'fdpersonal',
  configure: function(config) {
    config.addComponentToSidebarWithTabId(this.id, 'adminTab', FDPersonalComponent)

    config.addLabel('FD Personal', {
      'nl': 'FD Persoonlijk'
    })
  }
}
