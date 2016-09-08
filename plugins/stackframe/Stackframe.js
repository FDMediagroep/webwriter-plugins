'use strict';

function StackFrame() {
}

StackFrame.prototype.schema = {
    name: "stackframe",
    vendor: "nl.fdmg",
    node: require('./StackFrameNode'),
    converter: require('./StackFrameConverter'),
    component: require('./StackFrameComponent'),
    tool: [
        require('./StackFrameTool')
    ],
    command: require('./StackFrameCommand')
};

module.exports = StackFrame;
