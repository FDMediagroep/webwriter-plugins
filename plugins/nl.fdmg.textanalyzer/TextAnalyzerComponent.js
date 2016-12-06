import {Component} from 'substance'
import {api, event, lodash} from 'writer'
const pluginId = 'nl.fdmg.textanalyzer'

class TextAnalyzerComponent extends Component {
  constructor(...args) {
    super(...args)
    this.name = 'textanalyzer'
    this.type = 'fdmg/textanalyzer'
    api.events.on('textanalyzer', event.DOCUMENT_CHANGED, () => {
      this.calculateText()
      this.updateStatus()
    })
  }

  didMount() {
    this.updateStatus()
  }

  getInitialState() {
    const count = this.getCount()
    return {
      textLength: count.textLength,
      words: count.words,
      availableSizes: api.getConfigValue(pluginId, 'sizes')
    }
  }

  render($$) {
    this.virtualElement = $$  // Hack to use $$ for later use with updateStatus

    const documentSize = this.readDocumentSize()

    return $$('div')
      .addClass('textanalyzer plugin')
      .append(
        $$('div')
          .addClass('number__container clearfix')
          .append(
            $$('div')
              .addClass('count-info')
              .append($$('span').append(documentSize.label))
              .append($$('p').append(this.getLabel('Document')))
              .attr({title: this.getLabel('Document')}),
            $$('div')
              .addClass('count-info')
              .append($$('span').append(this.state.textLength.toString()))
              .append($$('p').append(this.getLabel('Characters')))
              .attr({title: this.getLabel('Characters')}),
            $$('div')
              .addClass('count-info')
              .append($$('span').append(this.state.words.toString()))
              .append($$('p').append(this.getLabel('Words')))
              .attr({title: this.getLabel('Words')})
          )
      )
  }

  calculateText() {
    const count = this.getCount()
    this.extendState({
      textLength: count.textLength,
      words: count.words
    })
  }

  getCount() {
    const nodes = api.document.getDocumentNodes()
    const counting = api.getConfigValue(pluginId, 'counting')

    const words = lodash(nodes)
      .filter(node => counting.some(el => node.isInstanceOf(el)))
      .filter(node => Boolean(node.content))
      .flatMap(node => node.content.trim().split(/\s+/))

    const textLength = words.reduce((acc, word) => acc + word.length, 0)

    return {
      words: words.size(),
      textLength: textLength
    }
  }

  updateStatus() {
    const textLength = this.state.textLength

    if (this.virtualElement) {

      // Notice that passing a VirtualElement (created with using $$) to the
      // popover.setStatusText method is an undocumented feature. Internal
      // Writer API changes may prevent this from working in the future.
      // Please provide an 'plain text' status in the else branch for fallback

      const $$ = this.virtualElement
      const el = $$('span')
        .setStyle('font-weight', 'bold')
        .append(
          $$('span').setStyle('color', this.getStatusColor()).append(textLength.toString()),
          $$('span').append(' ' + this.getLabel('characters'))
        )
      this.props.popover.setStatusText(el)
    } else {
      this.props.popover.setStatusText(`${textLength} ${this.getLabel('characters')}`)
    }
  }

  readDocumentSize() {
    const documentSize = api.newsItem
      .getLinkByType(this.name, this.type)
      .map(link => link['@size'])
      .pop() || this.state.availableSizes[0]['size']

    // match against available sizes
    return this.state.availableSizes.find(size =>
      size.size === documentSize
    ) || this.state.availableSizes[0]
  }

  getStatusColor() {
    const target = parseInt(this.readDocumentSize().count, 10)
    const actual = this.state.textLength
    const margin = target / 100 * parseInt(api.getConfigValue(pluginId, 'marginPct'), 10)
    const min = target - margin
    const max = target + margin

    if (target < 0) return '#000'
    else if (actual === target) return '#FF0'
    else if (actual < min) return '#000'
    else if (actual > max) return '#F00'
    else return '#0F0'
  }

  dispose() {
    api.events.off('textanalyzer', event.DOCUMENT_CHANGED)
  }
}

export default TextAnalyzerComponent
