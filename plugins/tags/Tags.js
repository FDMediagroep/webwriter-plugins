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
  },

  validation: require('./TagsValidation')
};

module.exports = Tags;
