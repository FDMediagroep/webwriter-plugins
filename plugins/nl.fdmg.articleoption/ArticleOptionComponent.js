import DropdownComponent from '../nl.fdmg.dropdown/DropdownComponent'
import './scss/articleoption.scss'

const {Component} = substance
const {api, idGenerator} = writer

class ArticleOptionComponent extends Component {
  constructor(plugin, ...args) {
    super(...args)

    this.name = plugin.name
    this.type = plugin.type
    this.label = plugin.label
    this.hasinput = plugin.hasInput
    this.value = plugin.inputText
    this.placeholder = plugin.inputPlaceholder
    this.pluginId = plugin.pluginId
    this.items = plugin.items
    this.hasSelect = plugin.hasSelect

  }

  getInitialState() {
    return {
      checked: this.getOptionChecked(),
      value: this.value,
      enabled: true
    }
  }

  render($$) {
    const el = $$('div')
    .addClass('fdmg-sidebar').append(
      $$('div')
      .addClass('checkbox form-group')
      .append(
        $$('label')
          .append(
            $$('input')
              .attr('type', 'checkbox')
              .attr(!this.state.enabled ? {'disabled': 'disabled'} : {})
              .attr(this.state.checked ? {'checked': 'checked'} : {})
              .on('change', () => {
                this.setOptionChecked(!this.state.checked)
              }),
              $$('span').append(this.getLabel(this.label))
          )
      ),
      $$('hr').addClass('options-hr')
    )

    if (this.hasinput && this.state.checked) {
      el.append(
        $$('input')
          .attr({
            'type': 'text',
            'value': this.state.value,
            'id': this.name,
            'placeholder': this.getLabel(this.placeholder) || ''
          })
          .on('blur', () => {
            this.setOptionChecked(true)
          })
          .ref('input')
      )
    }

    if (this.hasSelect && this.state.checked) {
      const selection = api.newsItem
        .getLinkByType(this.name, this.type)
        .map(l => {return {id: l['@id'], label: l['@title']}})
        .map(i => {
          const match = this.state.items.find(item => item.id === i.id)
          const label = (match !== undefined) ? match.label : i.label
          return {id: i.id, label: label}
        })
        .pop()

      el.append(

        $$(DropdownComponent, {
          onSelect: this.update.bind(this),
          items: this.state.items,
          allowFreeInput: false,
          allowEmptySelection: false,
          selection: selection
        })
      )
    }

    return el
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
        '@value': item.id,
        '@uuid': idGenerator()
      })
    }
  }

  getOptionChecked() {
    return api.newsItem
      .getLinkByType(this.name, this.type)
      .some(i => i['@checked'] === true)
  }

  setOptionChecked(checked) {
    // Clear existing links of this type
    api.newsItem
      .getLinkByType(this.name, this.type)
      .forEach(l => {
        api.newsItem.removeLinkByUUIDAndRel(this.name, l['@uuid'], l['@rel'])
      })

    const value = 'input' in this.refs ? this.refs.input.val() : ''

    // Set link
    const link = {
      '@rel': this.name,
      '@type': this.type,
      '@checked': checked,
      '@uuid': idGenerator()
    }

    if (this.hasinput && checked) {
      link['@value'] = value
    }

    api.newsItem.addLink(this.name, link)

    this.extendState({
      checked: checked,
      value: value
    })
  }

  enable() {
    this.extendState({enabled: true})
  }

  disable() {
    this.extendState({enabled: false})
  }
}

export default ArticleOptionComponent
