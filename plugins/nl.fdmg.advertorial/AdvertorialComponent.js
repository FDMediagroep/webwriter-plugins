import ArticleOption from '../nl.fdmg.articleoption/ArticleOptionComponent'
import {api} from 'writer'

class AdvertorialComponent extends ArticleOption {
  //items should be items
  // const items = this.endpoint

  // const selection = api.newsItem
  //   .getLinkByType(this.name, this.type)
  //   .map(l => {return {id: l['@id'], label: l['@title']}})
  //   .map(i => {
  //     const match = items.find(item => item.id === i.id)
  //     const label = (match !== undefined) ? match.label : i.label
  //     return {id: i.id, label: label}
  //   })
  //   .pop()

  constructor(...args) {
    super({
      name: "advertorial",
      type: "fdmg/advertorial",
      label: "Advertorial",
      hasInput: false,
      placeholder: 'URL to article',
      hasSelect: true,
      pluginId: 'nl.fdmg.advertorial'
    }, ...args)
  }

  render($$) {
    const eventState = this.state.checked ? 'disabled' : 'enabled'
    api.events.triggerEvent('', `advertorial:${eventState}`)
    return super.render($$)
  }
}

export default AdvertorialComponent
