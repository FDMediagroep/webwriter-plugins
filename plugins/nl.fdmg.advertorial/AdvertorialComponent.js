import ArticleOption from '../nl.fdmg.articleoption/ArticleOptionComponent'
import {api} from 'writer'

class AdvertorialComponent extends ArticleOption {

  getItems(){
    const endpoint = api.getConfigValue("nl.fdmg.advertorial", 'endpoint')
    const token = api.getConfigValue("nl.fdmg.advertorial", 'token')
    console.log(endpoint, token);
    
    return api.router.get('/api/resourceproxy', {
      url: endpoint,
      headers: {
        'x-access-token': `Bearer ${token}`
      }
    })
  }

  // getSelection(){
  //
  // }

  constructor(...args) {

    super({
      name: "advertorial",
      type: "fdmg/advertorial",
      label: "Advertorial",
      placeholder: 'URL to article',
      hasSelect: true,
      pluginId: 'nl.fdmg.advertorial',
      // items: items,
      // selection: selection
    }, ...args)
  }

  render($$) {
    this.getItems();
    const eventState = this.state.checked ? 'disabled' : 'enabled'
    api.events.triggerEvent('', `advertorial:${eventState}`)
    return super.render($$)
  }
}

export default AdvertorialComponent
