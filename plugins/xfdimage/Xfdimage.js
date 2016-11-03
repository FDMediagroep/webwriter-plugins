'use strict'

function Xfdimage() {
}

Xfdimage.prototype.schema = {
  name: 'xfdimage',
  vendor: 'nl.fdmg',

  tool: [require('./XfdimageTool')],
  command: require('./XfdimageCommand')
}

module.exports = Xfdimage
