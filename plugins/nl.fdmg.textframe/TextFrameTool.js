import {Tool} from 'substance';
import {api} from 'writer';

export default class StackFrameTool extends Tool {

  render($$) {
    var el = $$('div');

    el.append(
      $$('button').addClass('se-tool').append(
        $$('i').addClass('fa fa-list-alt')
      ).on('click', () => {
        api.editorSession.executeCommand('textframe', {heading: this.getLabel('Title'), content: this.getLabel('Text')});
      })
    );
    return el;
  }

}
