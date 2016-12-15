import ArticleOption from '../nl.fdmg.articleoption/ArticleOptionComponent'
import {api} from 'writer'
import './scss/redirectlink.scss'

class RedirectLinkComponent extends ArticleOption {
  constructor(...args) {
    super({
      name: "redirectlink",
      type: "fdmg/redirectlink",
      label: "Redirect article",
      hasInput: true,
      placeholder: 'URL to article'
    }, ...args)
  }

  didMount(){
    api.events.on(this.name, 'redirectlink:enabled', this.enable.bind(this))
    api.events.on(this.name, 'redirectlink:disabled', this.disable.bind(this))

    this.updateOtherOptions()
  }

  setOptionChecked(checked) {
    super.setOptionChecked(checked)
    this.updateOtherOptions()
  }

  updateOtherOptions() {
    const eventState = this.state.checked ? 'disabled' : 'enabled'
    api.events.triggerEvent('', `articletype:${eventState}`)
    api.events.triggerEvent('', `advertorial:${eventState}`)
  }

  dispose() {
    api.events.off(this.name, 'redirectlink:enabled')
    api.events.off(this.name, 'redirectlink:disabled')
  }
}

export default RedirectLinkComponent
