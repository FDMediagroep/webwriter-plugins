'use strict';

function Tags() {
}

Tags.prototype.schema = {
  name: 'tags',
  vendor: 'nl.fdmg',

  uicomponents: {
    sidebar: {
      main: [
        require('./TagsMainComponent')
      ]
    }
  }
};

module.exports = Tags;
