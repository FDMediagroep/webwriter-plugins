import {Command} from 'substance';

export default class NumberFrameCommand extends Command {
  getCommandState() {
    return {
      disabled: false
    };
  }

  execute(params, context) {
    var state = this.getCommandState();
    console.info('Added numberframe "' + params.heading + '" with content: "' + params.content + '" to document');
    if (state.disabled) {
      return;
    }
    var data = {
      type: 'numberframe',
      contentType: 'fdmg/numberframe',
      heading: params.heading,
      content: params.content,
      data: {
        type: 'fdmg/numberframe',
        'data-type': 'fdmg/numberframe'
      }
    };

    return context.api.document.insertBlockNode(data.type, data);
  }

}
