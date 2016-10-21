'use strict';

function Articletype() {
}

/**
 * Stockticker plugin schema definition
 *
 * @type {{name: string, vendor: string, node: *, converter: *, component: *, tool: *[], command: *[]}}
 */

Articletype.prototype.schema = {

    // Name and vendor is mandatory
    // Name must match the one provided in cfg/writer.json
    name: 'articletype',
    vendor: 'nl.fdmg',

    // Internal data definition
    // node: require('./TestpluginNode'),

    // Converter between external format and internal data node
    // converter: require('./TestpluginXMLConverter'),

    // Component renders node in text
    uicomponents: {
        sidebar: {
            information: [
                require('./ArticletypeComponent')
            ]
        }
    }

};

module.exports = Articletype;
