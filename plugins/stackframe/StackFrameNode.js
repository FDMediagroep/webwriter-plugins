'use strict';

var BlockNode = require('substance/model/BlockNode');

function StackFrame() {
    StackFrame.super.apply(this, arguments);
}

BlockNode.extend(StackFrame);


StackFrame.static.defineSchema({
    id: {
        type: 'string'
    },
    contentType: 'string',
    heading: 'string',
    content: 'string'
});

module.exports = StackFrame;
