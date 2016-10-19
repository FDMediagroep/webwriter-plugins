'use strict';

var BlockNode = require('substance/model/BlockNode');

function WorkinstructionsNode() {
    WorkinstructionsNode.super.apply(this, arguments);
}

BlockNode.extend(WorkinstructionsNode);


WorkinstructionsNode.static.defineSchema({
    id: {
        type: 'string'
    },
    contentType: 'string',
    format: 'string',
    text: 'string'
});

module.exports = WorkinstructionsNode;
