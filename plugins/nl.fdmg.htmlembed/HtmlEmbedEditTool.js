import {Tool} from 'substance';
import {api} from 'writer';

class HtmlEmbedEditTool extends Tool {
  didMount() {
    const textarea = this.refs.embedcode;
    textarea.getNativeElement().focus();
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

  insertEmbed() {
    api.editorSession.executeCommand('htmlembededit', {
      text: this.refs.embedcode.val()
    })
  }
}

export default HtmlEmbedEditTool;
