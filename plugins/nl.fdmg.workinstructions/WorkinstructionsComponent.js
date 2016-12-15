import {Component} from 'substance'
import {api} from 'writer'
import OpenWorkinstructionsDialog from './OpenWorkinstructionsDialog'

class WorkinstructionsComponent extends Component {
  constructor(...args) {
    super(...args)
  }

  getInitialState() {
    const workInstruction = api.newsItem.getContentMetaObjectsByType('fdmg/workinstructions')

    if (!workInstruction) {
      return { workInstruction : '' }
    } else {
      return { workInstruction : workInstruction.map(workinstruction => {
        return workinstruction.data.text
      }).pop()}
    }
  }

  render($$) {
    const workinstructionsArea = $$('div').addClass('workinstructions-wrapper')
      .append(
        $$('textarea')
          .addClass('workinstructions-textarea')
          .attr({'spellcheck' : false, 'disabled' : 'disabled', 'placeholder' : this.getLabel('Workinstruction placeholder')})
          .setValue(this.state.workinstruction)
          .ref('workinstructions').on('click', () => { this.editWorkinstruction()})
      )

    return $$('div').addClass('plugin workinstructions')
      .append(workinstructionsArea)
  }

  editWorkinstruction() {
    console.log('open area')
    OpenWorkinstructionsDialog({
      text: this.props.node.text,
      update: this.updateHtmlOnNode.bind(this)
    })
  }


}

export default WorkinstructionsComponent
