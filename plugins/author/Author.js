'use strict';

function Author() {
}

Author.prototype.schema = {
  name: 'author',
  vendor: 'nl.fdmg',

  uicomponents: {
    sidebar: {
      main: [
        require('./AuthorMainComponent')
      ]
    }
  },

  validation: require('./AuthorValidation')
};

module.exports = Author;
