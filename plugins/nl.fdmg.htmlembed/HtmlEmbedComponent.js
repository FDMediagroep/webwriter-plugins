import {Component, FontAwesomeIcon, TextPropertyComponent} from 'substance'
import {api} from 'writer'
import HtmlEmbedEditTool from './HtmlEmbedEditTool'
import OpenEmbedDialog from './openEmbedDialog'

class HtmlEmbedComponent extends Component {
  render($$) {
    const el = $$('div').addClass('im-blocknode__container im-htmlembed')
    el.append(this.renderHeader($$))
    el.append(this.renderContent($$))
    return el
  }

  renderHeader($$) {
    return $$('div')
      .addClass('header')
      .attr('contentEditable', false)
      .append(
        $$(FontAwesomeIcon, {icon: 'fa-code'}),
        $$('strong').append(this.getLabel('HTML Embed')).attr('contentEditable', false),
        $$('span')
          .addClass('edit-button')
          .append($$(FontAwesomeIcon, {icon: 'fa-pencil-square-o'}))
          .on('click', this.editEmbedHtml).attr('title', this.getLabel('Edit embed code'))
      )
  }

  renderContent($$) {
    const content = $$('div').addClass('im-blocknode__content').ref('embedContent')
    const textarea = $$(TextPropertyComponent, {
      tagName: 'div',
      path: [this.props.node.id, 'text']
    })
    textarea.append(this.props.node.text)
    textarea.ref('htmlarea')
    textarea.on('dblclick', () => {
      this.editEmbedHtml()
    })

    content.append(textarea)

    return content
  }

  editEmbedHtml() {
    OpenEmbedDialog({
      text: this.props.node.text,
      update: this.updateHtmlOnNode.bind(this)
    })
  }

  updateHtmlOnNode(html) {
    api.editorSession.transaction(tx => {
      tx.set([this.props.node.id, 'text'], html)
    })
    this.rerender()
  }
}

export default HtmlEmbedComponent
