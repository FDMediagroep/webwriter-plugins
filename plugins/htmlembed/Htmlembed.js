'use strict';

function Htmlembed() {}

Htmlembed.prototype.schema = {
    name: "htmlembed",
    vendor: "nl.fdmg",
    node: require('./HtmlembedNode'),
    converter: require('./HtmlembedConverter'),
    component: require('./HtmlembedComponent'),
    tool: [
        require('./HtmlembedTool'),
        require('./HtmlembedEditTool')
    ],
    command: require('./HtmlembedCommand')
};

module.exports = Htmlembed;
