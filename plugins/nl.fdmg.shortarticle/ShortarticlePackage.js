import ShortarticleComponent from './ShortarticleComponent'

export default {
  id: 'nl.fdmg.shortarticle',
  name: 'shortarticle',
  configure: function(config) {
    config.addComponentToSidebarWithTabId(this.id, 'adminTab', ShortarticleComponent)

    config.addLabel('Short article', {
      'nl': 'Kort artikel'
    })
  }
}
