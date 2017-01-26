import {Component} from 'substance'
import {api, idGenerator} from 'writer'
import WorkInstructionsEditTool from './WorkInstructionsEditTool'

const decoupledName = 'article-decoupled';
const decoupledType = 'fdmg/article-decoupled';
const name = 'workinstructions';
const type = 'fdmg/workinstructions';

class WorkinstructionsComponent extends Component {
  constructor(...args) {
    super(...args);
  }

  getInitialState() {
    const workInstructionsMeta = api.newsItem.getContentMetaObjectsByType(type);

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
    var decoupledLabel = this.getLabel('Article coupled')

    if (this.state.decoupled === true) {
      decoupledLabel = this.getLabel('Article decoupled')
    }

    const el = $$('div')
      .addClass('plugin workinstructions')
      .append($$('div').addClass('fdmg-sidebar')
      .append(
        $$('div').addClass('header')
        .append($$('h2')
          .append(this.getLabel('Workinstructions'))
        ),
        $$('div').addClass('checkbox form-group')
        .append(
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
            decoupledLabel
          )),
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

    return el
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
    const exisingWorkInstructionsMeta = api.newsItem.getContentMetaObjectsByType(type)

    if (exisingWorkInstructionsMeta) {
      exisingWorkInstructionsMeta.forEach(wi => {
        api.newsItem.removeContentMetaObject(type, wi['@id'])
      })
    }

    // Add new workInstructions
    api.newsItem.setContentMetaObject(type, {
      '@id': idGenerator(),
      '@type': type,
      '@name': name,
      data: {
        text: this.state.workInstructions
      }
    });
  }

  getOptionChecked() {
    return api.newsItem
      .getLinkByType(decoupledName, decoupledType)
      .some(i => i['@checked'] === "true");
  }

  updateDecoupled() {
    // Clear existing links of this type (from the NewsML representation)
    api.newsItem
      .getLinkByType(decoupledName, decoupledType)
      .forEach(l => {
        api.newsItem.removeLinkByUUIDAndRel(decoupledName, l['@uuid'], l['@rel'])
      });

    let link = {
      '@rel': decoupledName,
      '@type': decoupledType,
      '@checked': this.state.decoupled,
      '@uuid': idGenerator()
    };

    // Add the link (to NewsML representation)
    api.newsItem.addLink(decoupledName, link);
  }

}

export default WorkinstructionsComponent
