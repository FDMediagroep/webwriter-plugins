'use strict';

function Shortarticle() {
}

/**
 * Stockticker plugin schema definition
 *
 * @type {{name: string, vendor: string, node: *, converter: *, component: *, tool: *[], command: *[]}}
 */

Shortarticle.prototype.schema = {
    
    name: 'shortarticle',
    vendor: 'nl.fdmg',

    uicomponents: {
        sidebar: {
            information: [
                require('./ShortarticleComponent')
            ]
        }
    }

};

module.exports = Shortarticle;
