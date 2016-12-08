import ShortarticleComponent from './ShortarticleComponent'

export default {
  id: 'nl.fdmg.shortarticle',
  name: 'shortarticle',
  configure: function(config) {
    // config.addSidebarTab(this.id, 'Related')
    config.addComponentToSidebarWithTabId(this.id, 'main', ShortarticleComponent)

    config.addLabel('Short article', {
      'nl': 'Kort artikel'
    })
  }
}
