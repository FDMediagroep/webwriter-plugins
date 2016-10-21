'use strict';

function Workinstructions() {}

Workinstructions.prototype.schema = {
    name: "workinstructions",
    vendor: "nl.fdmg",
    uicomponents: {
        sidebar: {
            top: [
                require('./WorkinstructionsComponent')
            ]
        }
    }
};

module.exports = Workinstructions;
