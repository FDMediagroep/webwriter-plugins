import ArticleOption from '../nl.fdmg.articleoption/ArticleOptionComponent'
import {api} from 'writer'

class RedirectLinkComponent extends ArticleOption {
  constructor(...args) {
    super({
      name: "redirectlink",
      type: "fdmg/redirectlink",
      label: "Redirect article",
      hasInput: false,
      placeholder: 'URL to article'
    }, ...args)
  }

  render($$) {
    const eventState = this.state.checked ? 'disabled' : 'enabled'
    api.events.triggerEvent('', `articletype:${eventState}`)
    return super.render($$)
  }
}

export default RedirectLinkComponent
