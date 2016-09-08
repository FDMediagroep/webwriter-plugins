'use strict';

function Relatedarticle() {
}

/**
 * Stockticker plugin schema definition
 *
 * @type {{name: string, vendor: string, node: *, converter: *, component: *, tool: *[], command: *[]}}
 */

Relatedarticle.prototype.schema = {
    
    name: 'relatedarticle',
    vendor: 'nl.fdmg',

    uicomponents: {
        sidebar: {
            information: [
                require('./RelatedarticleComponent')
            ]
        }
    }

};

module.exports = Relatedarticle;
