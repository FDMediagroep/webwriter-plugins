import {Tool} from 'substance'
import {api} from 'writer'

class HtmlEmbedEditTool extends Tool {
  didMount() {
    this.resize()

    const textarea = this.refs.embedcode
    textarea.el.el.focus()

    textarea.el.on('keydown', () => {
      this.resize()
    })
    textarea.el.el.addEventListener('paste', () => {
      this.resize()
    })
    textarea.el.el.addEventListener('cut', () => {
      this.resize()
    })
  }

  insertEmbed() {
    api.editorSession.executeCommand('htmlembededit', {
      text: this.refs.embedcode.val()
    })
  }

  resize() {
    const htmlTextarea = this.refs.embedcode.el.el
    setTimeout(() => {
      htmlTextarea.style.height = 'auto'
      htmlTextarea.style.height = htmlTextarea.scrollHeight + '20px'
    }, 100)
  }

  render($$) {
    const el = $$('div').addClass('embed-dialog')
    const embed = $$('textarea')
      .addClass('textarea')
      .attr('spellcheck', false)
      .ref('embedcode')

    if (this.props.text) {
      embed.append(this.props.text)
    }
    el.append(embed)
    return el
  }

  onClose(status) {
    if (status === 'cancel') {

    }
    else if (status === 'save') {
      if (typeof(this.props.text) !== 'undefined') {
        this.props.update(this.refs.embedcode.val())
      } else {
        this.insertEmbed()
      }

      return true
    }
  }
}

export default HtmlEmbedEditTool
