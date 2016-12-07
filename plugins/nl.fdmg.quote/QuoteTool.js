import {Tool} from 'substance';
import {api} from 'writer';

export default class QuoteTool extends Tool {

  render($$) {
    var el = $$('button').addClass('se-tool').append(
      $$('i').addClass('fa fa-quote-left')
    ).on('click', () => {
      api.editorSession.executeCommand('quote', {quoteMessage: 'Write the quote here', quoteAuthor: 'John Doe'});
    });
    return el;
  }

}