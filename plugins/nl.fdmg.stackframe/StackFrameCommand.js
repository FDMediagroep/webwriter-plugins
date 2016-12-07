import {Command} from 'substance';

export default class StackFrameCommand extends Command {
  getCommandState() {
    return {
      disabled: false
    };
  }

  execute(params, context) {
    var state = this.getCommandState();
    console.info('Added stackframe "' + params.heading + '" with content: "' + params.content + '" to document');
    if (state.disabled) {
      return;
    }
    var data = {
      type: 'stackframe',
      contentType: 'fdmg/stackframe',
      heading: params.heading,
      content: params.content,
      data: {
        type: 'stackframe',
        'data-type': 'stackframe'
      }
    };

    return context.api.document.insertBlockNode(data.type, data);
  }

}
