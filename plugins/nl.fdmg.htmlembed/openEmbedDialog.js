import {api} from 'writer';
import HtmlEmbedEditTool from './HtmlEmbedEditTool';

export default (props) => {
  api.ui.showDialog(
    HtmlEmbedEditTool,
    props,
    {
      title: 'Embed HTML',
      cssClass: 'im-htmlembed-modal'
    }
  );
}
