'use strict'

function Fd4validation() {}

Fd4validation.prototype.schema = {
  name: 'fd4validation',
  vendor: 'nl.fdmg',
  validation: require('./Fd4validationValidation')
}

module.exports = Fd4validation
