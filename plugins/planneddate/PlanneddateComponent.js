 const Component = require('substance/ui/Component')
 const $$ = Component.$$
 const Icon = require('substance/ui/FontAwesomeIcon')
 const genUuid = require('writer/utils/IdGenerator')

function PlanneddateComponent() {
  PlanneddateComponent.super.apply(this, arguments)
}

PlanneddateComponent.Prototype = function() {
  this.getInitialState = function() {
    
  }

  this.render = function() {
    return $$('div').append($$('p').append('some text in this b'));
  }

  this.updateDate = function(option) {
  //   const api = this.context.api

  //   api
  //     .getLinkByType('planneddate', 'fdmg/planneddate')
  //     .forEach((l) => api.removeLinkByUUIDAndRel('planneddate', l['@uuid'], l['@rel']))

  //   api.addLink('planneddate', {
  //     '@rel': 'planneddate',
  //     '@type': 'fdmg/planneddate',
  //     '@label': this.state.selection.label,
  //     '@color': this.state.selection.color,
  //     '@uuid': genUuid(),
  //   })

  //   this.extendState({selection: option})
  }
}

Component.extend(PlanneddateComponent)
module.exports = PlanneddateComponent
