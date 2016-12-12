import AdvertorialComponent from './AdvertorialComponent'
import AdvertorialValidator from './AdvertorialValidator'

export default {
  id: 'nl.fdmg.advertorial',
  name: 'advertorial',

  configure: function(config) {
    config.addComponentToSidebarWithTabId(this.id, 'main', AdvertorialComponent)

    config.addValidator(AdvertorialValidator)

    config.addLabel('Advertorial', {nl: 'Advertorial'})

    // Example config method in advertorial plugin
    // arguments: tabId, name
    config.addSidebarTab('advancedTab', 'name')
    // arguments: name, tabId, componentname (e.g. AdvertorialComponent)
    config.addComponentToSidebarWithTabId('name', 'advancedTab', AdvertorialComponent)

  }
}
