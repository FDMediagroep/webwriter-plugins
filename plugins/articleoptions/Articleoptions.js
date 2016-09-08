'use strict';

function Articleoptions() {
}

Articleoptions.prototype.schema = {

    // Name and vendor is mandatory
    // Name must match the one provided in cfg/writer.json
    name: 'articleoptions',
    vendor: 'nl.fdmg',
};

module.exports = Articleoptions;
