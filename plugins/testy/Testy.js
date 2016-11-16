'use strict'

function Testy() {
}

Testy.prototype.schema = {
  name: 'testy',
  vendor: 'nl.fdmg',
  uicomponents: {
    sidebar: {
      main: [
        require('./TestyComponent')
      ]
    }
  }
}

module.exports = Testy
