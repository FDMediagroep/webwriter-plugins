import BreakingarticleComponent from './BreakingarticleComponent'

export default {
  id: 'nl.fdmg.breakingarticle',
  name: 'breakingarticle',
  configure: function(config) {
    config.addComponentToSidebarWithTabId(this.id, 'adminTab', BreakingarticleComponent)

    config.addLabel('Breaking article', {
      'nl': 'Breaking artikel'
    })
  }
}
