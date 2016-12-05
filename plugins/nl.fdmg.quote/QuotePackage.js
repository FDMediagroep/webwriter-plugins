import QuoteCommand from './QuoteCommand';
import QuoteComponent from './QuoteComponent';
import QuoteConverter from './QuoteConverter';
import QuoteNode from './QuoteNode';
import QuoteTool from './QuoteTool';

export default {
  id: 'nl.fdmg.quote',
  name: 'quote',
  configure: function(config) {
    config.addNode(QuoteNode);
    config.addConverter('newsml', QuoteConverter);
    config.addComponent('quote', QuoteComponent);
    config.addCommand('quote', QuoteCommand, {nodeType: 'quote'});
    config.addContentMenuTopTool('quote', QuoteTool);
    config.addIcon('quote', { 'fontawesome': 'fa-quote-left' });
    config.addLabel('quote', {
      en: 'Add quote',
      nl: 'Quote toevoegen'
    });
  },
  QuoteNode: QuoteNode,
  QuoteComponent: QuoteComponent,
  QuoteConverter: QuoteConverter

}