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
  }
};

module.exports = Author;
