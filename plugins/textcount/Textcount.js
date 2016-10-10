'use strict';

function Textcount() {
}

Textcount.prototype.schema = {

    name: 'textcount',
    vendor: 'nl.fdmg',

    uicomponents: {
        sidebar: {
            main: [
                require('./TextcountMainComponent')
            ]
        }
    }

};

module.exports = Textcount;
