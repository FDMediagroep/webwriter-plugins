'use strict';

function Linkedarticles() {
}

Linkedarticles.prototype.schema = {

  name: 'relatedarticles',
  vendor: 'nl.fdmg',

  uicomponents: {
    sidebar: {
      extra: [
        require('./RelatedarticlesComponent')
      ]
    }
  }
};

module.exports = Linkedarticles;
