'use strict';

function Localfocus() {
}

Localfocus.prototype.schema = {

  name: 'localfocus',
  vendor: 'nl.fdmg',
  node: require('./LocalfocusNode'),
  converter: require('./LocalfocusConverter'),
  component: require('./LocalfocusComponent'),
  command: [
    {
      command: require('./LocalfocusCommand'),
      handlers: [
        {
          type: 'uri',
          patterns: 'urlMatchers'
        }
      ]
    }
  ]
};

module.exports = Localfocus;
