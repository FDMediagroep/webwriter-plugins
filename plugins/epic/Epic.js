'use strict';

function Epic() {
}

Epic.prototype.schema = {

  name: 'epic',
  vendor: 'nl.fdmg',

  uicomponents: {
    sidebar: {
      main: [
        require('./EpicMainComponent')
      ]
    }
  }
};

module.exports = Epic;
