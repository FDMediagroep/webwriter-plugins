import ShowRelatedArticlesComponent from './ShowRelatedArticlesComponent'

export default {
  id: 'nl.fdmg.showrelatedarticles',
  name: 'showrelatedarticles',
  configure: function(config) {
    // config.addSidebarTab(this.id, 'Related')
    config.addComponentToSidebarWithTabId(this.id, 'main', ShowRelatedArticlesComponent)

    config.addLabel('Show related articles', {
      'nl': 'Gerelateerde artikelen niet tonen'
    })
  }
}
