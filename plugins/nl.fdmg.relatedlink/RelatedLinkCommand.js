import {Command} from 'substance';

export default class RelatedLinkCommand extends Command {
  getCommandState() {
    return {
      disabled: false
    };
  }

  execute(params, context) {
    const state = this.getCommandState();
    if (state.disabled) {
      return;
    }
    const data = {
      type: 'relatedlink',
      contentType: 'fdmg/relatedlink',
      prefix: params.prefix,
      leadtext: params.leadtext,
      relatedurl: params.relatedurl,
      data: {
        type: 'relatedlink',
        'data-type': 'relatedlink'
      }
    };

    return context.api.document.insertBlockNode(data.type, data);
  }

}
