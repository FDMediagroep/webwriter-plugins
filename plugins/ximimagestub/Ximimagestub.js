'use strict'

function Ximimagestub() {
}

Ximimagestub.prototype.schema = {
  name: 'ximimagestub',
  vendor: 'nl.fdmg',
  validation: require('./XimimagestubValidation.js')
}

module.exports = Ximimagestub
