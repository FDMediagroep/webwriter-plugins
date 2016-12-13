//import './scss/textframe.scss'
import TextFrameCommand from './TextFrameCommand';
import TextFrameComponent from './TextFrameComponent';
import TextFrameConverter from './TextFrameConverter';
import TextFrameNode from './TextFrameNode';
import TextFrameTool from './TextFrameTool';
import TextFrameValidator from './TextFrameValidator.js';

export default {
  id: 'nl.fdmg.textframe',
  name: 'textframe',
  configure: function (config) {
    config.addNode(TextFrameNode);
    config.addConverter('newsml', TextFrameConverter);
    config.addComponent('textframe', TextFrameComponent);
    config.addCommand('textframe', TextFrameCommand, {
      nodeType: 'textframe',
      handlers: [
        {
          type: 'drop',
          mimetypes: [
            'image/jpeg',
            'image/jpg',
            'image/gif',
            'image/png'
          ]
        },
        {
          type: 'uri',
          patterns: 'urlMatchers'
        },
        {
          type: 'newsItem',
          itemClasses: ['ninat:picture']
        }
      ]
    });
    config.addValidator(TextFrameValidator);
    config.addContentMenuTopTool('textframe', TextFrameTool);
    config.addIcon('textframe', {'fontawesome': 'fa-bars'});
    config.addLabel('Textframe', { nl: 'Tekstkader' });
    config.addLabel('Title', { nl: 'Titel' });
    config.addLabel('Text', { nl: 'Tekst' });

    config.addLabel('Textframe is missing title', { nl: 'Een of meerdere tekstkaders heeft geen titel' });

  }

}