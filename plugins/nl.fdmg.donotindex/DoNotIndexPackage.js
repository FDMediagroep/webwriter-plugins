import DoNotIndexComponent from './DoNotIndexComponent'

export default {
  id: 'nl.fdmg.donotindex',
  name: 'donotindex',
  configure: function(config) {
    // config.addSidebarTab(this.id, 'Related')
    config.addComponentToSidebarWithTabId(this.id, 'main', DoNotIndexComponent)

    config.addLabel('Do not index', {
      'nl': 'Artikel niet indexeren'
    })
  }
}
