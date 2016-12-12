import ShowRelatedArticlesComponent from './ShowRelatedArticlesComponent'

export default {
  id: 'nl.fdmg.showrelatedarticles',
  name: 'showrelatedarticles',
  configure: function(config) {
    config.addComponentToSidebarWithTabId(this.id, 'adminTab', ShowRelatedArticlesComponent)

    config.addLabel('Show related articles', {
      'nl': 'Gerelateerde artikelen niet tonen'
    })
  }
}
