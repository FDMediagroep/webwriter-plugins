'use strict';

function Showrelatedarticles() {
}

Showrelatedarticles.prototype.schema = {

    name: 'showrelatedarticles',
    vendor: 'nl.fdmg',

    uicomponents: {
        sidebar: {
            extra: [
                require('./ShowrelatedarticlesComponent')
            ]
        }
    }

};

module.exports = Showrelatedarticles;
