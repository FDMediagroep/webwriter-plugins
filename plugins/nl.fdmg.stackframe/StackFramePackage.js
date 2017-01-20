import './scss/stackframe.scss'
import StackFrameCommand from './StackFrameCommand';
import StackFrameComponent from './StackFrameComponent';
import StackFrameConverter from './StackFrameConverter';
import StackFrameNode from './StackFrameNode';
import StackFrameTool from './StackFrameTool';
import StackFrameValidator from './StackFrameValidator.js';

export default {
  id: 'nl.fdmg.stackframe',
  name: 'stackframe',
  configure: function (config) {
    config.addNode(StackFrameNode);
    config.addConverter('newsml', StackFrameConverter);
    config.addComponent('stackframe', StackFrameComponent);
    config.addCommand('stackframe', StackFrameCommand, {nodeType: 'stackframe'});
    config.addValidator(StackFrameValidator);
    config.addContentMenuTopTool('stackframe', StackFrameTool);
    config.addIcon('stackframe', {'fontawesome': 'fa-database'});
    config.addLabel('Stackframe', { 'nl': 'Stapelkader' });
    config.addLabel('Insert Stackframe', { 'nl': 'Stapelkader invoegen' });
    config.addLabel('Title', { 'nl': 'Titel' });
    config.addLabel('Text', { 'nl': 'Tekst' });

    config.addLabel('No stackframe heading', { 'nl': 'Een of meerdere stapelkaders heeft geen titel' });
    config.addLabel('No stackframe content', { 'nl': 'Een of meerdere stapelkaders heeft geen tekst' });
  }
}
