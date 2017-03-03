import {Command} from 'substance';

export default class NumberFrameCommand extends Command {
  getCommandState() {
    return {
      disabled: false
    };
  }

  execute(params, context) {
    var state = this.getCommandState();
    if (state.disabled) {
      return;
    }
    var data = {
      type: 'numberframe',
      contentType: 'fdmg/numberframe',
      heading: params.heading,
      content: params.content,
      data: {
        type: 'numberframe',
        'data-type': 'numberframe'
      }
    };

    return context.api.document.insertBlockNode(data.type, data);
  }

}
