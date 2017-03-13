import { Command } from 'substance';

class LocalFocusCommand extends Command {
  getCommandState() {
    return { disabled: true }
  }

  execute(params) {
    params.editorSession.transaction((tx) => {
      tx.insertBlockNode({
        type: 'localfocus',
        dataType: 'fdmg/localfocus',
        url: params.url
      })
    });
    return true;
  }
}

export default LocalFocusCommand;