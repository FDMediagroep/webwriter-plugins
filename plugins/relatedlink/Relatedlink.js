'use strict';

function RelatedLink() {
}

RelatedLink.prototype.schema = {
    name: "relatedlink",
    vendor: "nl.fdmg",
    node: require('./RelatedLinkNode'),
    converter: require('./RelatedLinkConverter'),
    component: require('./RelatedLinkComponent'),
    tool: [
        require('./RelatedLinkTool')
    ],
    command: require('./RelatedLinkCommand')
};

module.exports = RelatedLink;
