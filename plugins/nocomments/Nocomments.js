'use strict';

function Nocomments() {
}

/**
 * Stockticker plugin schema definition
 *
 * @type {{name: string, vendor: string, node: *, converter: *, component: *, tool: *[], command: *[]}}
 */

Nocomments.prototype.schema = {
    
    name: 'nocomments',
    vendor: 'nl.fdmg',

    uicomponents: {
        sidebar: {
            extra: [
                require('./NocommentsComponent')
            ]
        }
    }

};

module.exports = Nocomments;
