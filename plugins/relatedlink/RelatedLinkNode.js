'use strict';

var BlockNode = require('substance/model/BlockNode');

function RelatedLink() {
    RelatedLink.super.apply(this, arguments);
}

BlockNode.extend(RelatedLink);


RelatedLink.static.defineSchema({
    id: {
        type: 'string'
    },
    contentType: 'string',
    prefix: 'string',
    leadtext: 'string',
    relatedurl: 'string'
});

module.exports = RelatedLink;
