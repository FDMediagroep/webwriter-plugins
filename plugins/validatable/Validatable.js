'use strict';

function Validatable() {
}

Validatable.prototype.schema = {

    // Name and vendor is mandatory
    // Name must match the one provided in cfg/writer.json
    name: 'validatable',
    vendor: 'nl.fdmg',
};

module.exports = Validatable;
