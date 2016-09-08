'use strict';

function Rubric() {
}

/**
 * Stockticker plugin schema definition
 *
 * @type {{name: string, vendor: string, node: *, converter: *, component: *, tool: *[], command: *[]}}
 */

Rubric.prototype.schema = {

    // Name and vendor is mandatory
    // Name must match the one provided in cfg/writer.json
    name: 'rubric',
    vendor: 'nl.fdmg',

    // Internal data definition
    // node: require('./TestpluginNode'),

    // Converter between external format and internal data node
    // converter: require('./TestpluginXMLConverter'),

    // Component renders node in text
    uicomponents: {
        sidebar: {
            main: [
                require('./RubricComponent')
            ]
        }
    }

};

module.exports = Rubric;
