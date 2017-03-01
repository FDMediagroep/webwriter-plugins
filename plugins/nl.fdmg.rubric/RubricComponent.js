import DropdownComponent from '../nl.fdmg.dropdown/DropdownComponent';

const {Component} = substance;
const {api, idGenerator} = writer;
const pluginId = 'nl.fdmg.rubric';

class RubricComponent extends Component {
  constructor(...args) {
    super(...args);
    this.name = 'rubric';
    this.type = 'fdmg/rubric';
  }

  render($$) {
    const items = api.getConfigValue(pluginId, 'rubrics');
    const selection = api.newsItem
      .getLinkByType(this.name, this.type)
      .map(l => {return {id: l['@id'], label: l['@title']}})
      .map(i => {
        const match = items.find(item => item.id === i.id);
        const label = (match !== undefined) ? match.label : i.label;
        return {id: i.id, label: label}
      })
      .pop();

    return $$('div')
      .addClass('fdmg-sidebar')
      .append(
        $$(DropdownComponent, {
          onSelect: this.update.bind(this),
          header: this.getLabel('Rubric'),
          items: items,
          allowFreeInput: true,
          allowEmptySelection: true,
          selection: selection
        }),
        $$('hr')
      )
  }

  update(item) {
    api.newsItem
      .getLinkByType(this.name, this.type)
      .forEach(l => {
        api.newsItem.removeLinkByUUIDAndRel(this.name, l['@uuid'], l['@rel'])
      });

    if (item.id !== 'none' && item.label.trim() !== '') {
      api.newsItem.addLink(this.name, {
        '@rel': this.name,
        '@type': this.type,
        '@id': item.id,
        '@title': item.label,
        '@uuid': idGenerator()
      });
    }
  }
}

export default RubricComponent;
