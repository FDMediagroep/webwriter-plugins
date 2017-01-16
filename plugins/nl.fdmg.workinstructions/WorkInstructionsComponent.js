import {Component} from 'substance'
import {api, idGenerator} from 'writer'
import WorkInstructionsEditTool from './WorkInstructionsEditTool'

class WorkinstructionsComponent extends Component {
  constructor(...args) {
    super(...args);
    this.name = 'workinstructions';
    this.type = 'fdmg/workinstructions';
    this.decoupledName = 'article-decoupled';
    this.decoupledType = 'fdmg/article-decoupled';
  }

  getInitialState() {
    const workInstructionsMeta = api.newsItem.getContentMetaObjectsByType('fdmg/workinstructions');

    let workInstructions = '';
    if (workInstructionsMeta) {
      workInstructions = workInstructionsMeta.map(wi => wi.data.text).pop() || '';
    }

    return {
      workInstructions: workInstructions,
      decoupled: this.getOptionChecked()
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

  getOptionChecked() {
    return api.newsItem
      .getLinkByType(this.decoupledName, this.decoupledType)
      .some(i => i['@checked'] === "true");
  }

  updateDecoupled() {
    // Clear existing links of this type (from the NewsML representation)
    api.newsItem
      .getLinkByType(this.decoupledName, this.decoupledType)
      .forEach(l => {
        api.newsItem.removeLinkByUUIDAndRel(this.decoupledName, l['@uuid'], l['@rel'])
      });

    let link = {
      '@rel': this.decoupledName,
      '@type': this.decoupledType,
      '@checked': this.state.decoupled,
      '@uuid': idGenerator()
    };

    // Add the link (to NewsML representation)
    api.newsItem.addLink(this.name, link);
  }

}

export default WorkinstructionsComponent
