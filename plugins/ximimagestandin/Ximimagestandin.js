'use strict'

function Ximimagestandin() {
}

Ximimagestandin.prototype.schema = {
  name: 'ximimagestub',
  vendor: 'nl.fdmg',
  validation: require('./XimimagestandinValidation.js')
}

module.exports = Ximimagestandin
