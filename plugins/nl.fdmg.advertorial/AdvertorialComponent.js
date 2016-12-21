import ArticleOption from '../nl.fdmg.articleoption/ArticleOptionComponent'
import {api} from 'writer'

class AdvertorialComponent extends ArticleOption {

  didMount(){
    api.events.on(this.name, 'advertorial:enabled', this.enable.bind(this))
    api.events.on(this.name, 'advertorial:disabled', this.disable.bind(this))

    const endpoint = api.getConfigValue("nl.fdmg.advertorial", 'endpoint')
    const token = api.getConfigValue("nl.fdmg.advertorial", 'token')

    // api.router.get('/api/resourceproxy', {
    //   url: endpoint,
    //   headers: {
    //     'x-access-token': `Bearer ${token}`
    //   }
    // })
    fetch(endpoint, {
      method: 'GET',
      headers: {
        'x-access-token': `Bearer ${token}`
      }
    })
      .then(response => api.router.checkForOKStatus(response))
      .then(response => api.router.toJson(response))
      .then(response => response.map(x => {return {id: x, label: x}}))
      .then(response => {
        this.extendState({items: response})
      }
    )

    this.updateOtherOptions()
  }

  constructor(...args) {
    super({
      name: "advertorial",
      type: "fdmg/advertorial",
      label: "Advertorial",
      placeholder: 'URL to article',
      hasSelect: true,
      pluginId: 'nl.fdmg.advertorial',
      items: []
    }, ...args)
  }

  setOptionChecked(checked) {
    super.setOptionChecked(checked)
    this.updateOtherOptions()
  }

  updateOtherOptions() {
    const eventState = this.state.checked ? 'disabled' : 'enabled'

    setTimeout(() => {
      api.events.triggerEvent('', `articletype:${eventState}`)
      api.events.triggerEvent('', `redirectlink:${eventState}`)
    }, 200)
  }

  dispose() {
    api.events.off(this.name, 'advertorial:enabled')
    api.events.off(this.name, 'advertorial:disabled')
  }
}

export default AdvertorialComponent
