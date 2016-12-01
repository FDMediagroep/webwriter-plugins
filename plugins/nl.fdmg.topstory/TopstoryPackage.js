import TopstoryComponent from './TopstoryComponent'

export default {
  id: 'nl.fdmg.topstory',
  name: 'topstory',
  configure: function(config) {
    // config.addSidebarTab(this.id, 'Related')
    config.addComponentToSidebarWithTabId(this.id, 'main', TopstoryComponent)

    config.addLabel('Topstory text', {
      'nl': 'Topstory'
    })
  }
}
