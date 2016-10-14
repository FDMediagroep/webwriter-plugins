'use strict';

function Showrelatedarticles() {
}

Showrelatedarticles.prototype.schema = {

    name: 'showrelatedarticles',
    vendor: 'nl.fdmg',

    uicomponents: {
        sidebar: {
            information: [
                require('./ShowrelatedarticlesComponent')
            ]
        }
    }

};

module.exports = Showrelatedarticles;
