'use strict';

function Author() {
}

Author.prototype.schema = {
    name: 'author',
    vendor: 'infomaker.se',

    uicomponents: {
        sidebar: {
            main: [
                require('./AuthorMainComponent')
            ]
        }
    }
};

module.exports = Author;