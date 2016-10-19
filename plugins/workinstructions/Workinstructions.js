'use strict';

function Workinstructions() {}

Workinstructions.prototype.schema = {
    name: "workinstructions",
    vendor: "nl.fdmg",
    node: require('./WorkinstructionsNode'),
    converter: require('./WorkinstructionsConverter'),
    component: require('./WorkinstructionsComponent'),
    uicomponents: {
        sidebar: {
            information: [
                require('./WorkinstructionsComponent')
            ]
        }
    },
    tool: [
        require('./WorkinstructionsTool'),
        require('./WorkinstructionsEditTool')
    ],
    command: require('./WorkinstructionsCommand')
};

module.exports = Workinstructions;
