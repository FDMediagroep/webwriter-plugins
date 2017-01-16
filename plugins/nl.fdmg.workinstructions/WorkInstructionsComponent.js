import {Component} from 'substance'
import {api, idGenerator} from 'writer'
import WorkInstructionsEditTool from './WorkInstructionsEditTool'

class WorkinstructionsComponent extends Component {
  constructor(...args) {
    super(...args);
    this.name = 'workinstructions';
    this.type = 'fdmg/workinstructions';
    this.decoupledType = 'fdmg/article-decoupled';
  }

  getInitialState() {
    const workInstructionsMeta = api.newsItem.getContentMetaObjectsByType('fdmg/workinstructions');
    const decoupledMeta = api.newsItem.getContentMetaObjectsByType('fdmg/article-decoupled');

    let decoupled = false;
    let workInstructions = '';
    if (workInstructionsMeta) {
      workInstructions = workInstructionsMeta.map(wi => wi.data.text).pop() || '';
    }
    if (decoupledMeta) {
      decoupled = decoupledMeta.map(wi => wi.decoupled).pop() || false;
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
          .addClass('decoupled')
          .addClass(this.state.decoupled ? 'active' : '')
          .append(
            $$('input')
              .attr('type', 'checkbox')
              .attr(this.state.decoupled ? {'checked': 'checked'} : {})
              .on('change', () => {
                this.extendState({decoupled: !this.state.decoupled});
                this.updateDecoupled();
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
        text: this.state.workInstructions
      }
    });
  }

  updateDecoupled() {
    // Remove existing workInstructions
    const decoupledMeta = api.newsItem.getContentMetaObjectsByType(this.decoupledType)

    if (decoupledMeta) {
      decoupledMeta.forEach(wi => {
        api.newsItem.removeContentMetaObject(this.decoupledType, wi['@id'])
      })
    }

    // Add new workInstructions
    api.newsItem.setContentMetaObject(this.decoupledType, {
      '@id': idGenerator(),
      '@type': this.decoupledType,
      '@checked': this.state.decoupled
    });
  }

}

export default WorkinstructionsComponent
