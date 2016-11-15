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
  },

  validation: require('./RelatedarticlesValidation')
};

module.exports = Linkedarticles;
