import PaywallComponent from './PaywallComponent'

export default {
  id: 'nl.fdmg.paywall',
  name: 'paywall',
  configure: function(config) {
    config.addComponentToSidebarWithTabId(this.id, 'adminTab', PaywallComponent)

    config.addLabel('Free article', {
      'nl': 'Gratis artikel'
    })
  }
}
