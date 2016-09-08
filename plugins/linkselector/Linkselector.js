'use strict';

function LinkSelector() {
}

LinkSelector.prototype.schema = {

    // Name and vendor is mandatory
    // Name must match the one provided in cfg/writer.json
    name: 'linkselector',
    vendor: 'nl.fdmg',
};

module.exports = LinkSelector;
