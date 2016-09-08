'use strict';

var channels = require('./OEmbedChannels');

module.exports = {
    type: 'oembed',
    tagName: 'object',

    matchElement: function(el) {
        return channels.get().some(function(ch) { return el.is('object[type="fdmg/' + ch.type + '"]'); });
    },

    import: function(el, node, converter) {
        node.dataType = el.attr('type');

        if (el.attr('url')) node.url = el.attr('url');
        else node.url = al.attr('uri');

        node.uri = el.attr('uri');
        node.linkType = el.attr('type');
    },

    export: function(node, el, converter) {
        var $$ = converter.$$;

        el.attr({
            id: node.id,
            type: node.dataType,
            url: node.url,
            uri: node.uri
        });
    }
};
