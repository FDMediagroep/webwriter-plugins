const {Component} = substance
const {api, idGenerator} = writer

class ArticleOptionComponent extends Component {
  constructor(name, type, label, ...args) {
    super(...args)
    this.name = name
    this.type = type
    this.label = label
  }

  getInitialState() {
    return {
      checked: this.getOptionChecked()
    }
  }

  render($$) {
    return $$('div')
      .addClass('checkbox form-group')
      .append(
        $$('label')
          .append(
            $$('input')
              .attr('type', 'checkbox')
              .attr(this.state.checked ? {'checked': 'checked'} : {}),
            $$('span').append(this.getLabel(this.label))
          )
      )
      .on('change', () => {
        this.setOptionChecked(!this.state.checked)
      })
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

    // Set link
    api.newsItem.addLink(this.name, {
      '@rel': this.name,
      '@type': this.type,
      '@checked': checked,
      '@uuid': idGenerator()
    })

    this.extendState({checked})
  }
}

export default ArticleOptionComponent
