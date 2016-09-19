'use strict';

function Publish() {
}

Publish.prototype.schema = {
    name: 'concept',
    vendor: 'nl.fdmg',

    uicomponents: {
        sidebar: {
            top: [
                require('./PublishComponent')
            ]
        }
    }
};

module.exports = Publish;