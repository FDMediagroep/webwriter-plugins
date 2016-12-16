import AdvertorialComponent from './AdvertorialComponent'
import AdvertorialValidator from './AdvertorialValidator'

export default {
  id: 'nl.fdmg.advertorial',
  name: 'advertorial',

  configure: function(config) {
    config.addComponentToSidebarWithTabId(this.id, 'adminTab', AdvertorialComponent)
    config.addValidator(AdvertorialValidator)


    config.addLabel('Advertorial', {nl: 'Advertorial'})
    config.addLabel('Advertorial value missing', {nl: 'Artikel is gemarkeerd als advertorial maar geen advertorial geselecteerd'})
  }
}
