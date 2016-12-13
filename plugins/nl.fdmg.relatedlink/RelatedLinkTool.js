import {Tool} from 'substance';
import {api} from 'writer';

export default class RelatedLinkTool extends Tool {

  render($$) {
    var el = $$('button').addClass('se-tool').append(
      $$('i').addClass('fa fa-external-link-square')
    ).on('click', () => {
      api.editorSession.executeCommand('relatedlink', {prefix: this.getLabel('Also read'), leadtext: this.getLabel('Article title'), relatedurl: 'https://www.fd.nl'});
    });
    return el;
  }

}