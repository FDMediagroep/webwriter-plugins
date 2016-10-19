'use strict';

var BlockContentCommand = require('writer/commands/BlockContentCommand');
var uuid = require('substance/util/uuid');

function WorkinstructionsCommand() {
    WorkinstructionsCommand.super.apply(this, arguments);
}

WorkinstructionsCommand.Prototype = function() {

    this.insertWorkinstructions = function (text) {
        var state = this.getCommandState();

        if (state.disabled) {
            return;
        }

        //$('#im-modal-default').modal('show');

        var data = {
            type: 'workinstructions',
            contentType: 'fdmg/workinstructions',
            text: text,
            format: 'text',
            data: {
                type: 'fdmg/workinstructions',
                'data-type': 'fdmg/workinstructions'
            }
        };

        return this.context.api.insertBlockNode(data.type, data);
    };
};

BlockContentCommand.extend(WorkinstructionsCommand);
WorkinstructionsCommand.static.name = 'workinstructions';
module.exports = WorkinstructionsCommand;
