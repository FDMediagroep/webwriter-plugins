'use strict';

function Donotindex() {
}

/**
 * Stockticker plugin schema definition
 *
 * @type {{name: string, vendor: string, node: *, converter: *, component: *, tool: *[], command: *[]}}
 */

Donotindex.prototype.schema = {
    
    name: 'donotindex',
    vendor: 'nl.fdmg',

    uicomponents: {
        sidebar: {
            information: [
                require('./DonotindexComponent')
            ]
        }
    }

};

module.exports = Donotindex;
