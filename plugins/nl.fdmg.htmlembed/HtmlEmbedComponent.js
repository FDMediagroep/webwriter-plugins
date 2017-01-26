import {Component, FontAwesomeIcon, TextPropertyComponent} from 'substance'
import {api} from 'writer'
import OpenEmbedDialog from './openEmbedDialog'

class HtmlEmbedComponent extends Component {
  render($$) {
    return $$('div')
      .addClass('im-blocknode__container im-htmlembed')
      .append(
        $$('div')
          .addClass('header')
          .attr({contenteditable: false})
          .append(
            $$(FontAwesomeIcon, {icon: 'fa-code'}),
            $$('strong')
              .attr({contenteditable: false})
              .append(this.getLabel('HTML Embed')),
            $$('span')
              .addClass('edit-button')
              .attr({title: this.getLabel('Edit embed code')})
              .append($$(FontAwesomeIcon, {icon: 'fa-pencil-square-o'}))
              .on('click', this.editEmbedHtml)
          ),
          $$('div')
            .addClass('im-blocknode__content')
            .append(
              $$(TextPropertyComponent, {
                tagName: 'div',
                path: [this.props.node.id, 'text']
              })
              .append(this.props.node.text)
              .ref('htmlarea')
              .on('dblclick', this.editEmbedHtml)
            )
            .ref('embedContent')
      )
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
