import {Component, FontAwesomeIcon} from 'substance'
import {api} from 'writer'

class WorkflowstateComponent extends Component {
  constructor(...args) {
    super(...args)
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
              $$(FontAwesomeIcon, {icon: 'fa-circle'}).attr('style', 'color:' + this.state.selection.color),
              this.state.selection.text
            ),
          $$('ul')
            .addClass('dropdown-menu')
            .append(
              this.state.options.map(function(option) {
                return $$('li')
                  .append(
                    $$(FontAwesomeIcon, {icon: 'fa-circle'}).attr('style', 'color:' + option.color),
                    option.text
                  )
                  .on('click', function() {this.updateSelection(option)}.bind(this))
              }.bind(this))
            )
          )
      )
  }

}

export default WorkflowstateComponent
