'use strict';

var BlockNode = require('substance/model/BlockNode');

function Quote() {
    Quote.super.apply(this, arguments);
}

BlockNode.extend(Quote);


Quote.static.defineSchema({
    id: {
        type: 'string'
    },
    contentType: 'string',
    message: 'string',
    author: 'string'
});

module.exports = Quote;
