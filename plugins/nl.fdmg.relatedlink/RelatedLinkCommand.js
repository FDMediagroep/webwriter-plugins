import {Command} from 'substance';

export default class RelatedLinkCommand extends Command {
  getCommandState() {
    return {
      disabled: false
    };
  }

  execute(params, context) {
    var state = this.getCommandState();
    console.info('Added relatedlink prefix:', params.prefix, ', content:', params.leadtext, ', relatedurl:', params.relatedurl, 'to document');
    if (state.disabled) {
      return;
    }
    var data = {
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
