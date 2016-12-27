import HtmlEmbedTool from './HtmlEmbedTool';
import HtmlEmbedCommand from './HtmlEmbedCommand';
import HtmlEmbedEditCommand from './HtmlEmbedEditCommand';
import HtmlEmbedNode from './HtmlEmbedNode';
import HtmlEmbedComponent from './HtmlEmbedComponent';
import HtmlEmbedConverter from './HtmlEmbedConverter';
import HtmlembedValidator from './HtmlEmbedValidator';
import {platform} from 'substance';
import './scss/htmlembed.scss';

export default {
  id: 'nl.fdmg.htmlembed',
  name: 'htmlembed',
  configure: function(config) {

    config.addContentMenuTopTool(this.name, HtmlEmbedTool);

    config.addCommand(this.name, HtmlEmbedCommand);
    config.addCommand('htmlembededit', HtmlEmbedEditCommand);

    config.addNode(HtmlEmbedNode);

    config.addComponent(this.name, HtmlEmbedComponent);

    config.addConverter('newsml', HtmlEmbedConverter);

    config.addLabel('Edit embed code', {nl: 'Invoeg code aanpassen'});
    config.addLabel('Edit embed code', {nl: 'Invoeg code aanpassen'});
    config.addLabel('Insert html-embed', {nl: 'HTML embed invoegen'});

    config.addValidator(HtmlembedValidator);

    if (platform.isMac) {
      config.addKeyboardShortcut('cmd+alt+h', {command: 'htmlembed'});
    } else {
      config.addKeyboardShortcut('ctrl+alt+h', {command: 'htmlembed'});
    }
  }
}
