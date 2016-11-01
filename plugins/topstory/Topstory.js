'use strict';

function Topstory() {
}

Topstory.prototype.schema = {
    
    name: 'topstory',
    vendor: 'nl.fdmg',

    uicomponents: {
        sidebar: {
            extra: [
                require('./TopstoryComponent')
            ]
        }
    }

};

module.exports = Topstory;
