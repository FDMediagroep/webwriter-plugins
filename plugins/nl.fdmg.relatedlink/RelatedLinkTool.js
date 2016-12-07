import {Tool} from 'substance';
import {api} from 'writer';

export default class RelatedLinkTool extends Tool {

  render($$) {
    var el = $$('button').addClass('se-tool').append(
      $$('i').addClass('fa fa-external-link-square')
    ).on('click', () => {
      api.editorSession.executeCommand('relatedlink', {prefix: 'Prefix', leadtext: 'Leadtext', relatedurl: 'Related url'});
    });
    return el;
  }

}
