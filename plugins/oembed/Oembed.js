'use strict';

function Oembed() {
}

Oembed.prototype.schema = {

    name: 'oembed',
    vendor: 'nl.fdmg',
    node: require('./OEmbedNode'),
    converter: require('./OEmbedConverter'),
    component: require('./OEmbedComponent'),
    command: [
        {
            command: require('./OEmbedCommand'),
            handlers: [
                {
                    type: 'uri',
                    patterns: 'urlMatchers'
                }
            ]
        }
    ]
};

module.exports = Oembed;
