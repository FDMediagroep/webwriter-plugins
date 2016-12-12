import RelatedArticlesComponent from './RelatedArticlesComponent'
import RelatedArticlesValidator from './RelatedArticlesValidator'

export default {
  id: 'nl.fdmg.relatedarticles',
  name: 'relatedarticles',

  configure: function(config) {
    config.addComponentToSidebarWithTabId(this.id, 'advancedTab', RelatedArticlesComponent)

    config.addValidator(RelatedArticlesValidator)

    config.addLabel('Related articles', {
      'nl': 'Gerelateerde artikelen'
    })

    config.addLabel('Article url', {
      'nl': 'Artikel url'
    })

    config.addLabel('Related article url is invalid', {
      'nl': 'Gerelateerd artikel url is ongeldig'
    })
  }
}
