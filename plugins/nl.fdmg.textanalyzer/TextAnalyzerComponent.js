import {Component} from 'substance'
import {api, event} from 'writer'

class TextAnalyzerComponent extends Component {
  constructor(...args) {
    super(...args)
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
      words: count.words
    }
  }

  render($$) {
    this.virtualElement = $$  // Hack to use $$ for later use with updateStatus

    return $$('div')
      .addClass('textanalyzer plugin')
      .append(
        $$('div')
          .addClass('number__container clearfix')
          .append(
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

    let textContent = ''
    nodes.forEach(node => {
      if (node.content) {
        textContent += node.content.trim()
      }
    })

    const textLength = textContent.length
    const words = textContent.split(/\s+/)

    return {
      textLength: textLength,
      words: words.length
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
          $$('span').setStyle('color', '#F00').append(textLength.toString()),
          $$('span').append(' ' + this.getLabel('characters'))
        )
      this.props.popover.setStatusText(el)
    } else {
      this.props.popover.setStatusText(`${textLength} ${this.getLabel('characters')}`)
    }
  }

  dispose() {
    api.events.off('textanalyzer', event.DOCUMENT_CHANGED)
  }
}

export default TextAnalyzerComponent
