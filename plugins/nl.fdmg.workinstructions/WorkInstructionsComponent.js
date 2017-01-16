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

    let decoupled = false;
    let workInstructions = '';
    if (workInstructionsMeta) {
      decoupled = workInstructionsMeta.map(wi => wi.data.decoupled).pop() || false;
      workInstructions = workInstructionsMeta.map(wi => wi.data.text).pop() || '';
    }

    return {
      workInstructions: workInstructions,
      decoupled: decoupled
    }
  }

  render($$) {
    return $$('div')
      .addClass('plugin workinstructions')
      .append($$('div').addClass('fdmg-sidebar')
      .append(
        $$('div').addClass('header')
        .append($$('h2')
          .append(this.getLabel('Workinstructions'))
        ),
        $$('label')
          .addClass(this.state.decoupled ? 'decoupled active' : '')
          .append(
            $$('input')
              .attr('type', 'checkbox')
              .attr(this.state.decoupled ? {'checked': 'checked'} : {})
              .on('change', () => {
                this.extendState({decoupled: !this.state.decoupled});
                this.updateNewsML();
              }),
            this.getLabel('Decoupled')
          ),
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
      ),
      $$('hr')
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
    // Update internal state
    this.extendState({workInstructions: newWorkInstructions});
    this.updateNewsML();
  }

  updateNewsML() {
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
        decoupled: this.state.decoupled,
        text: this.state.workInstructions
      }
    });
  }
}

export default WorkinstructionsComponent
