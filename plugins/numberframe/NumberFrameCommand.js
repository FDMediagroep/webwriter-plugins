'use strict';

var BlockContentCommand = require('writer/commands/BlockContentCommand');
var uuid = require('substance/util/uuid');

function NumberFrameCommand() {
    NumberFrameCommand.super.apply(this, arguments);
}

NumberFrameCommand.Prototype = function() {

    this.insertNumberFrame = function (numberFrameHeading, numberFrameContent) {
        var state = this.getCommandState();
        console.info('Added numberframe "' + numberFrameHeading + '" with content: "' + numberFrameContent + '" to document');
        if (state.disabled) {
            return;
        }
        var data = {
            type: 'numberframe',
            contentType: 'fdmg/numberframe',
            heading: numberFrameHeading,
            content: numberFrameContent,
            data: {
                type: 'fdmg/numberframe',
                'data-type': 'fdmg/numberframe'
            }
        };

        return this.context.api.insertBlockNode(data.type, data);
    };
};

BlockContentCommand.extend(NumberFrameCommand);
NumberFrameCommand.static.name = 'numberframe';
module.exports = NumberFrameCommand;
