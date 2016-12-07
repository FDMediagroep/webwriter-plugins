import './scss/quote.scss'
import QuoteCommand from './QuoteCommand';
import QuoteComponent from './QuoteComponent';
import QuoteConverter from './QuoteConverter';
import QuoteNode from './QuoteNode';
import QuoteTool from './QuoteTool';
import QuoteValidator from './QuoteValidator.js';

export default {
  id: 'nl.fdmg.quote',
  name: 'quote',
  configure: function (config) {
    config.addNode(QuoteNode);
    config.addConverter('newsml', QuoteConverter);
    config.addComponent('quote', QuoteComponent);
    config.addCommand('quote', QuoteCommand, {nodeType: 'quote'});
    config.addValidator(QuoteValidator);
    config.addContentMenuTopTool('quote', QuoteTool);
    config.addIcon('quote', {'fontawesome': 'fa-quote-left'});
    config.addLabel('Quote', { nl: 'Quote' });
    config.addLabel('Source', { nl: 'Bron' });
  }
}