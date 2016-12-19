import FullWidthComponent from './FullWidthComponent'

export default {
  id: 'nl.fdmg.fullwidth',
  name: 'fullwidth',
  configure: function(config) {
    config.addComponentToSidebarWithTabId(this.id, 'adminTab', FullWidthComponent)

    config.addLabel('Full width article', {
      'nl': 'Artikel over gehele breedte tonen'
    })
  }
}
