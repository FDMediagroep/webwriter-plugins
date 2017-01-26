import {Component, FontAwesomeIcon} from 'substance'
import {api, idGenerator} from 'writer'
import './scss/workflowstate.scss'

class WorkflowstateComponent extends Component {
  constructor(...args) {
    super(...args)
    this.name = 'workflowstate'
    this.type = 'fdmg/workflowstate'
  }

  didMount() {
    this.updateStatus()
  }

  getInitialState() {
    const options = api.getConfigValue('nl.fdmg.workflowstate', 'options')
    const label = api.newsItem.getLinkByType('workflowstate', 'fdmg/workflowstate')
      .map(link => link['@label'] )
      .pop() || options[0].label
    const selection = options.find((option) => option.label === label)

    return { options, selection}
  }

  render($$) {
    const statusText = $$('span').append(
      this.state.selection.text).addClass('state-text')

    const el = $$('div')
    .addClass('workflowstate plugin')
    .append(
      $$('h2').append( this.getLabel('Workflowstate')),
      $$('p').append( this.getLabel('Dit artikel is '), statusText),
      $$('div')
        .addClass('dropdown')
        .append(
          $$('ul')
            .addClass('dropdown-menu')
            .append(
              this.state.options.map(function(option) {
                return $$('li')
                  .append($$('span')
                    .append(
                      $$(FontAwesomeIcon, {icon: 'fa-circle'}).attr('style', 'color:' + option.color),
                      option.text
                    )
                  )
                  .on('click', function() {this.updateSelection(option)}.bind(this))
              }.bind(this)
            )
          )
        )
      )

    return el
  }

  updateSelection(newSelection) {
    api.newsItem
      .getLinkByType('workflowstate', 'fdmg/workflowstate')
      .forEach((l) => api.newsItem.removeLinkByUUIDAndRel('workflowstate', l['@uuid'], l['@rel']))

    api.newsItem.addLink('workflowstate', {
      '@rel': 'workflowstate',
      '@type': 'fdmg/workflowstate',
      '@label': newSelection.label,
      '@uuid': idGenerator(),
    })

    this.extendState({selection: newSelection})
    this.updateStatus()
    this.props.popover.close()
  }

  updateStatus() {
    const workflowState = this.state.selection.text
    const stateIconClass = this.state.selection.label

    this.props.popover.setStatusText(
      workflowState
    )
    this.props.popover.setIcon('fa-circle ' + stateIconClass + ' workflowstate-icon')
  }

}

export default WorkflowstateComponent
