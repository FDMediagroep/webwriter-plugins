import {Tool} from 'substance';
import {api} from 'writer';

export default class StackFrameTool extends Tool {

  render($$) {
    const el = $$('button').addClass('se-tool').append(
      $$('i').addClass('fa fa-database')
    ).attr('title', this.getLabel('Insert Stackframe'))
    .on('click', () => {
      api.editorSession.executeCommand('stackframe', {heading: this.getLabel('Title'), content: this.getLabel('Text')});
    });
    return el;
  }

}
