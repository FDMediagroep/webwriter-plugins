'use strict';

var BlockContentCommand = require('writer/commands/BlockContentCommand');
var uuid = require('substance/util/uuid');

function HtmlembedCommand() {
    HtmlembedCommand.super.apply(this, arguments);
}

HtmlembedCommand.Prototype = function() {

    this.insertEmbedhtml = function (text) {
        var state = this.getCommandState();

        if (state.disabled) {
            return;
        }

        //$('#im-modal-default').modal('show');

        var data = {
            type: 'htmlembed',
            contentType: 'fdmg/htmlembed',
            text: text,
            format: 'html',
            data: {
                type: 'fdmg/htmlembed',
                'data-type': 'fdmg/htmlembed'
            }
        };

        return this.context.api.insertBlockNode(data.type, data);
    };
};

BlockContentCommand.extend(HtmlembedCommand);
HtmlembedCommand.static.name = 'htmlembed';
module.exports = HtmlembedCommand;
