'use strict';

function NumberFrame() {
}

NumberFrame.prototype.schema = {
    name: "numberframe",
    vendor: "nl.fdmg",
    node: require('./NumberFrameNode'),
    converter: require('./NumberFrameConverter'),
    component: require('./NumberFrameComponent'),
    tool: [
        require('./NumberFrameTool')
    ],
    command: require('./NumberFrameCommand')
};

module.exports = NumberFrame;
