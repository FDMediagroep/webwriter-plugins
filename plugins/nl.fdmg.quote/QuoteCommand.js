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

    let joinedText = '';
    selection.getFragments().forEach(fragment => {
      if(fragment.type === 'selection-fragment') {
        joinedText += document.querySelector('[data-path="' + fragment.path.join('.') + '"]').innerText.substr(fragment.startOffset, fragment.endOffset) + ' ';
      }
    });
    joinedText = joinedText.replace('\n', '').trim();

    return (joinedText.length > 0)?joinedText:null;
  }

  /**
   * Insert given nodeObj at the line before the current selection.
   * @param params
   * @param nodeObj
   */
  insertAtSelection(params, nodeObj) {
    const editorSession = params.editorSession;
    const doc = editorSession.getDocument();

    editorSession.transaction((tx, args) => {
      tx.selection = doc.createSelection({
        type: 'property',
        containerId: 'body',
        path: [args.selection.getFragments()[0].path[0], 'content'],
        startOffset: 0
      });
      tx.insertBlockNode(nodeObj);
    });
  }

  /**
   * Returns the Quote node.
   *
   * @param message
   * @param author
   * @returns {{type: string, contentType: string, message: *, author: *, data: {type: string, data-type: string}}}
   */
  getQuoteNode(message, author) {
    return {
      type: 'quote',
      contentType: 'fdmg/quote',
      message: message,
      author: author,
      data: {
        type: 'quote',
        'data-type': 'quote'
      }
    };
  }

  execute(params, context) {

    params.quoteMessage = this.getSelectionText(params.selection) || params.quoteMessage;

    const state = this.getCommandState();
    if (state.disabled) {
      return;
    }
    const data = this.getQuoteNode(params.quoteMessage, params.quoteAuthor);
    if(params.selection.getFragments().length > 0) {
      this.insertAtSelection(params, data);
    } else {
      context.api.document.insertBlockNode(data.type, data);
    }
  }


}
