import {Command} from 'substance';

export default class QuoteCommand extends Command {
  getCommandState() {
    return {
      disabled: false
    };
  }

  execute(params, context) {
    var state = this.getCommandState();
    console.info('Added quote "' + params.quoteMessage + '" with author: "' + params.quoteAuthor + '" to document');
    if (state.disabled) {
      return;
    }
    var data = {
      type: 'quote',
      contentType: 'fdmg/quote',
      message: params.quoteMessage,
      author: params.quoteAuthor,
      data: {
        type: 'quote',
        'data-type': 'quote'
      }
    };
    return context.api.document.insertBlockNode(data.type, data);
  }

}