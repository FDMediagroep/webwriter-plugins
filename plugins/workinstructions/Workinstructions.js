'use strict';

function Workinstructions() {}

Workinstructions.prototype.schema = {
    name: "workinstructions",
    vendor: "nl.fdmg",
    uicomponents: {
        sidebar: {
            information: [
                require('./WorkinstructionsComponent')
            ]
        }
    }
};

module.exports = Workinstructions;
