'use strict';

function Quote() {
}

Quote.prototype.schema = {
    name: "quote",
    vendor: "nl.fdmg",
    node: require('./QuoteNode'),
    converter: require('./QuoteConverter'),
    component: require('./QuoteComponent'),
    tool: [
        require('./QuoteTool'),
    ],
    command: require('./QuoteCommand')
};

module.exports = Quote;