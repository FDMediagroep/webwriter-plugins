import {Tool} from 'substance';
import {api} from 'writer';

export default class NumberFrameTool extends Tool {

  render($$) {
    var el = $$('button').addClass('se-tool').append(
      $$('i').addClass('fa fa-eur')
    ).attr('title', this.getLabel('Insert Numberframe'))
    .on('click', () => {
      api.editorSession.executeCommand('numberframe', {heading: this.getLabel('Amount'), content: this.getLabel('Text')});
    });
    return el;
  }

}
