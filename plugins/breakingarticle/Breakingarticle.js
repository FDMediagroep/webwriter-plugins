'use strict';

function Breakingarticle() {
}

/**
 * Stockticker plugin schema definition
 *
 * @type {{name: string, vendor: string, node: *, converter: *, component: *, tool: *[], command: *[]}}
 */

Breakingarticle.prototype.schema = {
    
    name: 'breakingarticle',
    vendor: 'nl.fdmg',

    uicomponents: {
        sidebar: {
            extra: [
                require('./BreakingarticleComponent')
            ]
        }
    }

};

module.exports = Breakingarticle;
