'use strict';

function Linkedarticles() {
}

Linkedarticles.prototype.schema = {

  name: 'linkedarticles',
  vendor: 'nl.fdmg',

  uicomponents: {
    sidebar: {
      main: [
        require('./LinkedarticlesComponent')
      ]
    }
  }
};

module.exports = Linkedarticles;
