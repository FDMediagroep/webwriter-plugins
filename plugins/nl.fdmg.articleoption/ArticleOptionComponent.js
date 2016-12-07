const {Component} = substance
const {api, idGenerator} = writer

class ArticleOptionComponent extends Component {
  constructor(name, type, label, hasinput, inputText, inputPlaceholder, ...args) {
    super(...args)
    this.name = name
    this.type = type
    this.label = label
    this.hasinput = hasinput
    this.value = inputText
    this.placeholder = inputPlaceholder
  }

  getInitialState() {
    return {
      checked: this.getOptionChecked(),
      value: this.value
    }
  }

  render($$) {
    const el = $$('div')
      .addClass('checkbox form-group')
      .append(
        $$('label')
          .append(
            $$('input')
              .attr('type', 'checkbox')
              .attr(this.state.checked ? {'checked': 'checked'} : {})
              .on('change', () => {
                this.setOptionChecked(!this.state.checked)
              }),
              $$('span').append(this.getLabel(this.label))
          )
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

    return el
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
}

export default ArticleOptionComponent
