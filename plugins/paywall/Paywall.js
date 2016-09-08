'use strict';

function Paywall() {
}

/**
 * Stockticker plugin schema definition
 *
 * @type {{name: string, vendor: string, node: *, converter: *, component: *, tool: *[], command: *[]}}
 */

Paywall.prototype.schema = {
    
    name: 'paywall',
    vendor: 'nl.fdmg',

    uicomponents: {
        sidebar: {
            information: [
                require('./PaywallComponent')
            ]
        }
    }

};

module.exports = Paywall;
