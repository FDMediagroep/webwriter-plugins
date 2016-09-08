'use strict';

function Section() {
}

/**
 * Stockticker plugin schema definition
 *
 * @type {{name: string, vendor: string, node: *, converter: *, component: *, tool: *[], command: *[]}}
 */

Section.prototype.schema = {

    // Name and vendor is mandatory
    // Name must match the one provided in cfg/writer.json
    name: 'section',
    vendor: 'nl.fdmg',

    // Internal data definition
    // node: require('./TestpluginNode'),

    // Converter between external format and internal data node
    // converter: require('./TestpluginXMLConverter'),

    // Component renders node in text
    uicomponents: {
        sidebar: {
            main: [
                require('./SectionComponent')
            ]
        }
    }

};

module.exports = Section;
