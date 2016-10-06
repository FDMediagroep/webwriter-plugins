'use strict';

var BlockContentCommand = require('writer/commands/BlockContentCommand');

function LocalfocusCommand() {
  LocalfocusCommand.super.apply(this, arguments);
  this.name = 'localfocus';
}

LocalfocusCommand.Prototype = function() {

  this.execute = function(url) {
    var data = {
      dataType: 'fdmg/localfocus',
      url: url
    };

    this.context.api.insertBlockNode(this.name, data);

    return true;
  };
};


BlockContentCommand.extend(LocalfocusCommand);

LocalfocusCommand.static.name = 'localfocus';

module.exports = LocalfocusCommand;
