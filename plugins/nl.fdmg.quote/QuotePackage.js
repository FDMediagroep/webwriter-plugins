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
    config.addTool('add-quote', QuoteTool);
    config.addIcon('add-quote', { 'fontawesome': 'fa-quote-left' });
    config.addLabel('add-quote', {
      en: 'Add quote',
      nl: 'Quote toevoegen'
    });
  },
  QuoteNode: QuoteNode,
  QuoteComponent: QuoteComponent,
  QuoteConverter: QuoteConverter

}