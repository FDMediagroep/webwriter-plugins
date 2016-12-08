import './scss/numberframe.scss'
import NumberFrameCommand from './NumberFrameCommand';
import NumberFrameComponent from './NumberFrameComponent';
import NumberFrameConverter from './NumberFrameConverter';
import NumberFrameNode from './NumberFrameNode';
import NumberFrameTool from './NumberFrameTool';
import NumberFrameValidator from './NumberFrameValidator.js';

export default {
  id: 'nl.fdmg.numberframe',
  name: 'numberframe',
  configure: function (config) {
    config.addNode(NumberFrameNode);
    config.addConverter('newsml', NumberFrameConverter);
    config.addComponent('numberframe', NumberFrameComponent);
    config.addCommand('numberframe', NumberFrameCommand, {nodeType: 'numberframe'});
    config.addValidator(NumberFrameValidator);
    config.addContentMenuTopTool('numberframe', NumberFrameTool);
    config.addIcon('numberframe', {'fontawesome': 'fa-money'});
    config.addLabel('Numberframe', { nl: 'Cijferkader' });
    config.addLabel('Text', { nl: 'Tekst' });
    config.addLabel('Amount', { nl: 'Aantal' });

    config.addLabel('No numberframe heading', { nl: 'Een of meerdere cijferkaders heeft geen titel' });
    config.addLabel('No numberframe content', { nl: 'Een of meerdere cijferkaders heeft geen tekst' });

  }
}