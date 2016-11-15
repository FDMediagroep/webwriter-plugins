'use strict';

function RedirectLink() {
}

RedirectLink.prototype.schema = {
    name: 'redirectlink',
    vendor: 'nl.fdmg',

    uicomponents: {
        sidebar: {
            information: [
                require('./RedirectLinkComponent')
            ]
        }
    },
    validation: require('./RedirectlinkValidation')
};

module.exports = RedirectLink;
