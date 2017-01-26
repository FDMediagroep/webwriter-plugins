import ArticleTypeComponent from './ArticleTypeComponent'

export default {
  id: 'nl.fdmg.articletype',
  name: 'articletype',
  configure: function(config) {
    config.addComponentToSidebarWithTabId(this.id, 'adminTab', ArticleTypeComponent)

    config.addLabel('Article type', {
      'nl': 'Artikel type'
    })
    config.addLabel('- no selection -', {
      'nl': '- geen selectie -'
    })
    config.addLabel('free input', {
      'nl': 'vrije invoer'
    })
  }
}
