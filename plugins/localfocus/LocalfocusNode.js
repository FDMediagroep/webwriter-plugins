'use strict';

var BlockNode = require('substance/model/BlockNode');

function LocalfocusNode() {
  LocalfocusNode.super.apply(this, arguments);
}

BlockNode.extend(LocalfocusNode);

LocalfocusNode.static.defineSchema({
  dataType: 'string',
  url: 'string'
});

module.exports = LocalfocusNode;
