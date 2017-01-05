import {Command} from 'substance';

export default class QuoteCommand extends Command {
  getCommandState() {
    return {
      disabled: false
    };
  }

  /**
   * Join the selection of text in the writer and return it.
   * @param selection
   * @returns {string}
   */
  getSelectionText(selection) {

    console.log(selection.getFragments());
    let joinedText = '';
    selection.getFragments().forEach(fragment => {
      if(fragment.type === 'selection-fragment') {
        joinedText += document.querySelector('[data-path="' + fragment.path.join('.') + '"]').innerText.substr(fragment.startOffset, fragment.endOffset) + ' ';
      }
    });
    joinedText = joinedText.replace('\n', '').trim();

    return (joinedText.length > 0)?joinedText:null;
  }

  execute(params, context) {

    params.quoteMessage = this.getSelectionText(params.selection) || params.quoteMessage;

    var state = this.getCommandState();

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
