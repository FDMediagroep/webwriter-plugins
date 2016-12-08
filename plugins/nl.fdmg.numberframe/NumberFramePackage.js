import './scss/numberframe.scss'
import NumberFrameCommand from './NumberFrameCommand';
import NumberFrameComponent from './NumberFrameComponent';
import NumberFrameConverter from './NumberFrameConverter';
import NumberFrameNode from './NumberFrameNode';
import NumberFrameTool from './NumberFrameTool';

export default {
  id: 'nl.fdmg.numberframe',
  name: 'numberframe',
  configure: function (config) {
    config.addNode(NumberFrameNode);
    config.addConverter('newsml', NumberFrameConverter);
    config.addComponent('numberframe', NumberFrameComponent);
    config.addCommand('numberframe', NumberFrameCommand, {nodeType: 'numberframe'});
    config.addContentMenuTopTool('numberframe', NumberFrameTool);
    config.addIcon('numberframe', {'fontawesome': 'fa-money'});
    config.addLabel('Numberframe', { nl: 'Cijferkader' });
    config.addLabel('Text', { nl: 'Tekst' });
    config.addLabel('Amount', { nl: 'Aantal' });
  }
}