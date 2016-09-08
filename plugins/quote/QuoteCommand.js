'use strict';

var BlockContentCommand = require('writer/commands/BlockContentCommand');
var uuid = require('substance/util/uuid');

function QuoteCommand() {
    QuoteCommand.super.apply(this, arguments);
}

QuoteCommand.Prototype = function() {

    this.insertQuote = function (quoteMessage, quoteAuthor) {
        console.log(quoteMessage, quoteAuthor, 'command stuff');
        var state = this.getCommandState();
        console.info('Added quote "' + quoteMessage + '" with author: "' + quoteAuthor + '" to document');
        if (state.disabled) {
            return;
        }
        var data = {
            type: 'quote',
            contentType: 'fdmg/quote',
            message: quoteMessage,
            author: quoteAuthor,
            data: {
                type: 'quote',
                'data-type': 'quote'
            }
        };

        return this.context.api.insertBlockNode(data.type, data);
    };
};

BlockContentCommand.extend(QuoteCommand);
QuoteCommand.static.name = 'quote';
module.exports = QuoteCommand;
