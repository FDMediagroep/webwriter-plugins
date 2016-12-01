import DropdownComponent from '../nl.fdmg.dropdown/DropdownComponent'

const {Component} = substance
const {api, idGenerator} = writer
const pluginId = 'nl.fdmg.articletype'

class ArticleTypeComponent extends Component {
  constructor(...args) {
    super(...args)
    this.name = 'articletype'
    this.type = 'fdmg/articletype'
  }

  getInitialState() {
    return {
      enabled: api.newsItem.getLinkByType('redirectlink', 'fdmg/redirectlink').every(l => l['@checked'] !== true)
    }
  }

  didMount() {
    api.events.on(this.name, 'articletype:enabled', this.enable.bind(this))
    api.events.on(this.name, 'articletype:disabled', this.disable.bind(this))
  }

  render($$) {
    const items = api.getConfigValue(pluginId, 'articletypes')
    const selection = api.newsItem
      .getLinkByType(this.name, this.type)
      .map(l => {return {id: l['@id'], label: l['@title']}})
      .map(i => {
        const match = items.find(item => item.id === i.id)
        const label = (match !== undefined) ? match.label : i.label
        return {id: i.id, label: label}
      })
      .pop()

    return $$('div')
      .addClass('fdmg-sidebar')
      .append(
        $$(DropdownComponent, {
          onSelect: this.update.bind(this),
          header: this.getLabel('Article type'),
          items: items,
          allowFreeInput: false,
          allowEmptySelection: false,
          selection: selection,
          disabled: !this.state.enabled
        }),
        $$('hr')
      )
  }

  update(item) {
    api.newsItem
      .getLinkByType(this.name, this.type)
      .forEach(l => {
        api.newsItem.removeLinkByUUIDAndRel(this.name, l['@uuid'], l['@rel'])
      })

    if (item.id !== 'none' && item.label.trim() !== '') {
      api.newsItem.addLink(this.name, {
        '@rel': this.name,
        '@type': this.type,
        '@id': item.id,
        '@title': item.label,
        '@uuid': idGenerator()
      })
    }
  }

  enable() {
    this.extendState({enabled: true})
  }

  disable() {
    this.extendState({enabled: false})
  }

  dispose() {
    api.events.off(this.name, 'articletype:enabled')
    api.events.off(this.name, 'articletype:disabled')
  }
}

export default ArticleTypeComponent
