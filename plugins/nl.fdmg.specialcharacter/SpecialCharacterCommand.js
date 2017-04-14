import {InsertInlineNodeCommand} from 'substance';
import {api} from 'writer';

class SpecialCharacterCommand extends InsertInlineNodeCommand {
  execute(params) {
    api.editorSession.transaction(tx => {
      tx.insertText(params.character)
    });
  }
}

export default SpecialCharacterCommand;
