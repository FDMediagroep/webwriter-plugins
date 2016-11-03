 const Component = require('substance/ui/Component')
 const $$ = Component.$$
 const Icon = require('substance/ui/FontAwesomeIcon')
 const genUuid = require('writer/utils/IdGenerator')

function WorkflowstateComponent() {
  WorkflowstateComponent.super.apply(this, arguments)
}

WorkflowstateComponent.Prototype = function() {
  this.getInitialState = function() {
    const api = this.context.api
    const options = api.getConfigValue('workflowstate', 'options')
    const label = api
      .getLinkByType('workflowstate', 'fdmg/workflowstate')
      .map((link) => link['@label'])
      .pop() || options[0].label
    const selection = options.find((option) => option.label == label)

    return {options, selection}
  }

  this.render = function() {
    return $$('div')
      .addClass('workflowstate plugin')
      .append(
        $$('h2'),
        $$('div')
          .addClass('dropdown')
          .append(
            $$('button')
              .addClass('btn btn-default')
              .attr({'type': 'button', 'data-toggle': 'dropdown'})
              .append(
                $$(Icon, {icon: 'fa-circle'}).attr('style', 'color:' + this.state.selection.color),
                this.state.selection.text
              ),
            $$('ul')
              .addClass('dropdown-menu')
              .append(
                this.state.options.map(function(option) {
                  return $$('li')
                    .append(
                      $$(Icon, {icon: 'fa-circle'}).attr('style', 'color:' + option.color),
                      option.text
                    )
                    .on('click', function() {this.updateSelection(option)}.bind(this))
                }.bind(this))
              ),
          )
      )
  }

  this.updateSelection = function(newSelection) {
    const api = this.context.api

    api
      .getLinkByType('workflowstate', 'fdmg/workflowstate')
      .forEach((l) => api.removeLinkByUUIDAndRel('workflowstate', l['@uuid'], l['@rel']))

    api.addLink('workflowstate', {
      '@rel': 'workflowstate',
      '@type': 'fdmg/workflowstate',
      '@label': newSelection.label,
      '@uuid': genUuid(),
    })

    this.extendState({selection: newSelection})
  }
}

Component.extend(WorkflowstateComponent)
module.exports = WorkflowstateComponent
