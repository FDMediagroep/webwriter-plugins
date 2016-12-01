import BreakingarticleComponent from './BreakingarticleComponent'

export default {
  id: 'nl.fdmg.breakingarticle',
  name: 'breakingarticle',
  configure: function(config) {
    // config.addSidebarTab(this.id, 'Related')
    config.addComponentToSidebarWithTabId(this.id, 'main', BreakingarticleComponent)

    config.addLabel('Breaking article', {
      'nl': 'Breaking article'
    })
  }
}
