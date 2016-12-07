import AdvertorialComponent from './AdvertorialComponent'
import AdvertorialValidator from './AdvertorialValidator'

export default {
  id: 'nl.fdmg.advertorial',
  name: 'advertorial',

  configure: function(config) {
    config.addComponentToSidebarWithTabId(this.id, 'main', AdvertorialComponent)

    config.addValidator(AdvertorialValidator)

    config.addLabel('Advertorial', {nl: 'Advertorial'})

  }
}
