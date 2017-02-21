import {Tool} from 'substance'
import {api} from 'writer'

class HtmlEmbedEditTool extends Tool {
  didMount() {
    this.resize()

    const textarea = this.refs.embedcode
    textarea.getNativeElement().focus()

    textarea.el.on('keydown', this.resize)

    textarea.el.el.addEventListener('paste', this.resize)
    textarea.el.el.addEventListener('cut', this.resize)
  }

  render($$) {
    return $$('div')
      .addClass('embed-dialog')
      .append(
        $$('textarea')
          .addClass('textarea')
          .attr({spellcheck: false})
          .append(this.props.text ? this.props.text : [])
          .ref('embedcode')
      )
  }

  onClose(status) {
    if (status === 'save') {
      if (typeof(this.props.text) !== 'undefined') {
        this.props.update(this.refs.embedcode.val())
      } else {
        this.insertEmbed()
      }
      return true
    }
  }

  resize() {
    const htmlTextarea = this.refs.embedcode.getNativeElement()
    setTimeout(() => {
      htmlTextarea.style.height = 'auto'
      htmlTextarea.style.height = htmlTextarea.scrollHeight
    }, 100)
  }

  insertEmbed() {
    api.editorSession.executeCommand('htmlembededit', {
      text: this.refs.embedcode.val()
    })
  }
}

export default HtmlEmbedEditTool
