'use strict';

function Textcount() {
}

Textcount.prototype.schema = {

    name: 'textcount',
    vendor: 'nl.fdmg',

    uicomponents: {
        sidebar: {
            information: [
                require('./TextcountMainComponent')
            ]
        }
    }

};

module.exports = Textcount;
