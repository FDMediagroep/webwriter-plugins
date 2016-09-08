'use strict';

var BlockContentCommand = require('writer/commands/BlockContentCommand');
var uuid = require('substance/util/uuid');

function StackFrameCommand() {
    StackFrameCommand.super.apply(this, arguments);
}

StackFrameCommand.Prototype = function() {

    this.insertStackFrame = function (numberFrameHeading, numberFrameContent) {
        var state = this.getCommandState();
        console.info('Added stackframe "' + numberFrameHeading + '" with content: "' + numberFrameContent + '" to document');
        if (state.disabled) {
            return;
        }
        var data = {
            type: 'stackframe',
            contentType: 'fdmg/stackframe',
            heading: numberFrameHeading,
            content: numberFrameContent,
            data: {
                type: 'fdmg/stackframe',
                'data-type': 'fdmg/stackframe'
            }
        };

        return this.context.api.insertBlockNode(data.type, data);
    };
};

BlockContentCommand.extend(StackFrameCommand);
StackFrameCommand.static.name = 'stackframe';
module.exports = StackFrameCommand;
