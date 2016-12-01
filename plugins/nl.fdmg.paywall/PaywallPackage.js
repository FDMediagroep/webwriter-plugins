import PaywallComponent from './PaywallComponent'

export default {
  id: 'nl.fdmg.paywall',
  name: 'paywall',
  configure: function(config) {
    // config.addSidebarTab(this.id, 'Related')
    config.addComponentToSidebarWithTabId(this.id, 'main', PaywallComponent)

    config.addLabel('Free article', {
      'nl': 'Gratis artikel'
    })
  }
}
