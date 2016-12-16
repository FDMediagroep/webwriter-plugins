import {Component} from 'substance'
import {api, idGenerator} from 'writer'
import WorkInstructionsEditTool from './WorkInstructionsEditTool'

class WorkinstructionsComponent extends Component {
  constructor(...args) {
    super(...args)
    this.name = 'workinstructions'
    this.type = 'fdmg/workinstructions'
  }

  getInitialState() {
    const workInstructionsMeta = api.newsItem.getContentMetaObjectsByType('fdmg/workinstructions')

    let workInstructions = ''
    if (workInstructionsMeta) {
      workInstructions = workInstructionsMeta.map(wi => wi.data.text).pop() || ''
    }

    return {
      workInstructions: workInstructions
    }
  }

  render($$) {
    return $$('div')
      .addClass('plugin workinstructions')
      .append(
        $$('div')
          .addClass('workinstructions-wrapper')
          .append(
            $$('textarea')
              .addClass('workinstructions-textarea')
              .attr({
                spellcheck: false,
                disabled: 'disabled',
                placeholder: this.getLabel('Workinstructions placeholder')
              })
              .setValue(this.state.workInstructions)
          )
          .on('click', this.editWorkInstructions)
      )
  }

  editWorkInstructions() {
    api.ui.showDialog(
      WorkInstructionsEditTool,
      {
        text: this.state.workInstructions,
        update: this.updateWorkInstructions.bind(this)
      },
      {
        title: this.getLabel('Edit workinstructions'),
        cssClass: 'im-htmlembed-modal'
      }
    )
  }

  updateWorkInstructions(newWorkInstructions) {
    // Remove existing workInstructions
    const exisingWorkInstructionsMeta = api.newsItem.getContentMetaObjectsByType(this.type)

    if (exisingWorkInstructionsMeta) {
      exisingWorkInstructionsMeta.forEach(wi => {
        api.newsItem.removeContentMetaObject(this.type, wi['@id'])
      })
    }

    // Add new workInstructions
    api.newsItem.setContentMetaObject(this.type, {
      '@id': idGenerator(),
      '@type': this.type,
      '@name': this.name,
      data: {
        text: newWorkInstructions
      }
    })

    // Update internal state
    this.extendState({workInstructions: newWorkInstructions})
  }
}

export default WorkinstructionsComponent
