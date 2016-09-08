'use strict';

function Defaultvalidation() {}


Defaultvalidation.prototype.schema = {
    name: 'defaultvalidation',
    vendor: 'nl.fdmg',

    // Validation class
    // Must implement function isValid(DomDocument, i18n)
    validation: require('./DefaultvalidationValidation')
};

module.exports = Defaultvalidation;
