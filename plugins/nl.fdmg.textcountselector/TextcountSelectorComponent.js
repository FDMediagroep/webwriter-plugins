import {Component, FontAwesomeIcon} from 'substance'
import {api, idGenerator} from 'writer'

class TextcountSelectorComponent extends Component {
  getInitialState() {
    const availableSizes = api.getConfigValue('nl.fdmg.textanalyzer', 'sizes')
    const documentSize = this.readDocumentSize(availableSizes)

    return {
      documentSize,
      availableSizes
    }
  }

  render($$) {
    return $$('div')
    .addClass('fdmg-sidebar')
      .append(
        $$('h2').append(this.getLabel('Textcount size'), $$(FontAwesomeIcon, {icon: 'fa-asterisk'})),
        $$('div').addClass('form-group')
        .append(
        $$('select')
          .append(
            this.state.availableSizes.map(size => {
              return $$('option')
                .attr({'data-id': size.size})
                .attr(size.disabled ? {disabled: 'disabled'} : {})
                .attr(size.disabled || this.state.documentSize.size === size.size ? {selected: 'selected'} : {})
                .append((size.label !== '?' && size.label !== '∞') ? size.size + ' ( ' + size.count + ' )' : size.label)
            })
          )
          .ref('select')
          .on('change', () => {
            const options = this.refs.select.el.el.options
            const option = options[options.selectedIndex]
            const id = option.attributes['data-id'].value

            const size = this.state.availableSizes.find(size => size.size === id)

            this.updateDocumentSize(size)
          }),
          $$('hr')
      )
    )
  }

  readDocumentSize(availableSizes) {
    const documentSize = api.newsItem
      .getLinkByType('textcount', 'fdmg/textcount')
      .map(link => link['@size'])
      .pop() || availableSizes[0]['size']

    // match against available sizes
    return availableSizes.find(size =>
      size.size === documentSize
    ) || availableSizes[0]
  }

  updateDocumentSize(size) {
    api.newsItem
      .getLinkByType('textcount', 'fdmg/textcount')
      .forEach(link => api.newsItem.removeLinkByUUIDAndRel('textcount', link['@uuid'], link['@rel']))

    api.newsItem.addLink('textcount', {
      '@rel': 'textcount',
      '@type': 'fdmg/textcount',
      '@size': size.size,
      '@uuid': idGenerator()
    })

    this.extendState({
      documentSize: this.readDocumentSize(this.state.availableSizes)
    })
  }
}

export default TextcountSelectorComponent
