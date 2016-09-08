'use strict';

var BlockNode = require('substance/model/BlockNode');

function HtmlembedNode() {
    HtmlembedNode.super.apply(this, arguments);
}

BlockNode.extend(HtmlembedNode);


HtmlembedNode.static.defineSchema({
    id: {
        type: 'string'
    },
    contentType: 'string',
    format: 'string',
    text: 'string'
});

module.exports = HtmlembedNode;
