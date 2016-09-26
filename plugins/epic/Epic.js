'use strict';

function Epic() {
}

/**
 * Stockticker plugin schema definition
 *
 * @type {{name: string, vendor: string, node: *, converter: *, component: *, tool: *[], command: *[]}}
 */

Epic.prototype.schema = {

    name: 'epic',
    vendor: 'nl.fdmg',

    uicomponents: {
        sidebar: {
            main: [
                require('./EpicMainComponent')
            ]
        }
    }

};

module.exports = Epic;
