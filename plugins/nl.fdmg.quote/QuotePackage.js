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
    config.addLabel('Insert Quote', { nl: 'Quote invoegen' });
    config.addLabel('Source', { nl: 'Bron' });

    config.addLabel('Missing one or more quote messages', { nl: 'Een of meerdere quotes bevat geen tekst' });
    config.addLabel('Missing one or more quote sources', { nl: 'Een of meerdere quotes bevat geen bron' });

  }
}