'use strict';

var BlockContentCommand = require('writer/commands/BlockContentCommand');
var uuid = require('substance/util/uuid');

function RelatedLinkCommand() {
    RelatedLinkCommand.super.apply(this, arguments);
}

RelatedLinkCommand.Prototype = function() {

    this.insertRelatedLink = function (prefix, leadText, relatedUrl) {
        var state = this.getCommandState();
        console.info('Added relatedlink "' + prefix + '" with leadtext: "' + leadText + '" and url: "' + leadText + '" to document');
        if (state.disabled) {
            return;
        }
        var data = {
            type: 'relatedlink',
            contentType: 'fdmg/relatedlink',
            prefix: prefix,
            leadtext: leadText,
            relatedurl: relatedUrl,
            data: {
                type: 'fdmg/relatedlink',
                'data-type': 'fdmg/relatedlink'
            }
        };

        return this.context.api.insertBlockNode(data.type, data);
    };
};

BlockContentCommand.extend(RelatedLinkCommand);
RelatedLinkCommand.static.name = 'relatedlink';
module.exports = RelatedLinkCommand;
