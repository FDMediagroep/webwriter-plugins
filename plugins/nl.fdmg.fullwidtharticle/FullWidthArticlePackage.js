import FullWidthArticleComponent from './FullWidthArticleComponent'

export default {
  id: 'nl.fdmg.fullwidtharticle',
  name: 'fullwidtharticle',
  configure: function(config) {
    config.addComponentToSidebarWithTabId(this.id, 'adminTab', FullWidthArticleComponent)

    config.addLabel('Full width article', {
      'nl': 'Artikel over gehele breedte tonen'
    })
  }
}
