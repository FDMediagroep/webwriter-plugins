import {Tool} from 'substance';
import {api} from 'writer';

export default class QuoteTool extends Tool {

  render($$) {
    var el = $$('button').addClass('se-tool').append(
      $$('i').addClass('fa fa-quote-left')
    ).attr('title', this.getLabel('Quote'))
    .on('click', () => {
      api.editorSession.executeCommand('quote', {quoteMessage: this.getLabel('Quote'), quoteAuthor: this.getLabel('Source')});
    });
    return el;
  }

}
