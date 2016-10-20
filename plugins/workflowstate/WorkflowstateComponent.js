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
    const selection = api
      .getLinkByType('workflowstate', 'fdmg/workflowstate')
      .map((link) => {
        return {label: link['@label'], color: link['@color']}
      })
      .pop()
      || (options.length > 0 ? options[0] : {label:'', color:'#ffffff'})

    return {options, selection}
  }

  this.render = function() {
    return $$('div')
      .addClass('workflowstate plugin')
      .append(
        $$('hr'),
        $$('h2').append(this.context.i18n.t('Workflow')),
        $$('div')
          .addClass('dropdown')
          .append(
            $$('button')
              .addClass('btn btn-default dropdown-toggle')
              .attr({'type': 'button', 'data-toggle': 'dropdown'})
              .append(
                $$(Icon, {icon: 'fa-circle'}).attr('style', 'color:' + this.state.selection.color),
                this.state.selection.label,
                $$('span').addClass('caret'),
              ),
            $$('ul')
              .addClass('dropdown-menu')
              .append(
                this.state.options.map(function(opt) {
                  return $$('li')
                    .append(
                      $$(Icon, {icon: 'fa-circle'}).attr('style', 'color:' + opt.color),
                      opt.label
                    )
                    .on('click', function() {
                      this.updateSelection(opt)
                    }.bind(this))
                }.bind(this))
              ),
          )
      )
  }

  this.updateSelection = function(option) {
    const api = this.context.api

    api
      .getLinkByType('workflowstate', 'fdmg/workflowstate')
      .forEach((l) => api.removeLinkByUUIDAndRel('workflowstate', l['@uuid'], l['@rel']))

    api.addLink('workflowstate', {
      '@rel': 'workflowstate',
      '@type': 'fdmg/workflowstate',
      '@label': this.state.selection.label,
      '@color': this.state.selection.color,
      '@uuid': genUuid(),
    })

    this.extendState({selection: option})
  }
}

Component.extend(WorkflowstateComponent)
module.exports = WorkflowstateComponent
