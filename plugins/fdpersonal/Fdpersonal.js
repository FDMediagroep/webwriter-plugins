'use strict';

function Fdpersonal() {
}

/**
 * Stockticker plugin schema definition
 *
 * @type {{name: string, vendor: string, node: *, converter: *, component: *, tool: *[], command: *[]}}
 */

Fdpersonal.prototype.schema = {
    
    name: 'fdpersonal',
    vendor: 'nl.fdmg',

    uicomponents: {
        sidebar: {
            information: [
                require('./FdpersonalComponent')
            ]
        }
    }

};

module.exports = Fdpersonal;
