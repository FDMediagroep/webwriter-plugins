import {Tool} from 'substance'

class WorkInstructionEditTool extends Tool {

  didMount() {
    this.refs.textarea.focus()
  }

  render($$) {
    return $$('div')
      .addClass('embed-dialog')
      .append(
        $$('textarea')
          .addClass('textarea')
          .attr({
            spellcheck: false,
            placeholder: this.getLabel('Workinstructions placeholder')
          })
          .append(this.props.text)
          .ref('textarea')
      )
  }

  onClose(status) {
    if (status === 'save') {
      this.props.update(this.refs.textarea.val())
    }
  }

}

export default WorkInstructionEditTool
