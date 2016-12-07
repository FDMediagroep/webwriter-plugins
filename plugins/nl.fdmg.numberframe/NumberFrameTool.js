import {Tool} from 'substance';
import {api} from 'writer';

export default class NumberFrameTool extends Tool {

  render($$) {
    var el = $$('button').addClass('se-tool').append(
      $$('i').addClass('fa fa-money')
    ).on('click', () => {
      api.editorSession.executeCommand('numberframe', {heading: 'Heading', content: 'Content'});
    });
    return el;
  }

}
