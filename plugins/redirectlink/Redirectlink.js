'use strict';

function RedirectLink() {
}

/**
 * Stockticker plugin schema definition
 *
 * @type {{name: string, vendor: string, node: *, converter: *, component: *, tool: *[], command: *[]}}
 */

RedirectLink.prototype.schema = {
    
    name: 'redirectlink',
    vendor: 'nl.fdmg',

    uicomponents: {
        sidebar: {
            main: [
                require('./RedirectLinkComponent')
            ]
        }
    }

};

module.exports = RedirectLink;
