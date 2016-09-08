'use strict';

var BlockNode = require('substance/model/BlockNode');

function NumberFrame() {
    NumberFrame.super.apply(this, arguments);
}

BlockNode.extend(NumberFrame);


NumberFrame.static.defineSchema({
    id: {
        type: 'string'
    },
    contentType: 'string',
    heading: 'string',
    content: 'string'
});

module.exports = NumberFrame;
