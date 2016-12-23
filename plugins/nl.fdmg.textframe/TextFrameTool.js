import {Tool} from 'substance'
import {api} from 'writer'

class TextframeTool extends Tool {

  render($$) {

    const el = $$('div')
    el.attr('title', this.getLabel('Insert Textframe'))

    el.append(
      $$('button').addClass('se-tool').append(
          $$('i').addClass('fa fa-list-alt')
      )
      .on('click', this.insertTextframe)
    );
    return el;

  }

  insertTextframe() {
    const commandName = this.getCommandName()
    api.editorSession.executeCommand(commandName)
  }
}
export default TextframeTool
