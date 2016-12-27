import DropdownComponent from '../nl.fdmg.dropdown/DropdownComponent';
import './scss/articletype.scss';

const {Component} = substance;
const {api, idGenerator} = writer;
const pluginId = 'nl.fdmg.articletype';

export default class ArticleTypeComponent extends Component {
  constructor(...args) {
    super(...args);
    this.name = 'articletype';
    this.type = 'fdmg/articletype';
    api.events.on(this.name, api.getConfigValue(pluginId, 'optionsGroup') + ':enabled', this.enable.bind(this));
    api.events.on(this.name, api.getConfigValue(pluginId, 'optionsGroup') + ':disabled', this.disable.bind(this));
  }

  /**
   * Override to provide own initial state.
   *
   * @returns {{enabled: (boolean|*)}}
   */
  getInitialState() {
    return {
      enabled: api.newsItem.getLinkByType('redirectlink', 'fdmg/redirectlink').every(l => l['@checked'] !== true)
    };
  }

  /**
   * Every component must override this function.
   * Returns a virtual representation of this component which will be used to render the actual DOM element later.
   *
   * @param $$
   * @returns {void|*|ServerResponse}
   */
  render($$) {
    const items = api.getConfigValue(pluginId, 'articletypes');
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
          header: this.getLabel('Article type'),
          items: items,
          allowFreeInput: false,
          allowEmptySelection: false,
          selection: selection,
          disabled: !this.state.enabled
        }),
        $$('hr')
      );
  }

  /**
   * Called when selection in dropdown has changed.
   * @param item
   */
  update(item) {
    // Remove existing link from NewsML
    api.newsItem
      .getLinkByType(this.name, this.type)
      .forEach(l => {
        api.newsItem.removeLinkByUUIDAndRel(this.name, l['@uuid'], l['@rel'])
      });

    if (item.id !== 'none' && item.label.trim() !== '') {
      // Add link to NewsML
      api.newsItem.addLink(this.name, {
        '@rel': this.name,
        '@type': this.type,
        '@id': item.id,
        '@title': item.label,
        '@uuid': idGenerator()
      });
    }
  }

  /**
   * Called by event listener.
   */
  enable() {
    this.extendState({enabled: true});
  }

  /**
   * Called by event listener.
   */
  disable() {
    this.extendState({enabled: false});
  }

  /**
   * Remove listeners when this plugin is unloaded (happens when tab is no longer active)
   */
  dispose() {
    api.events.off(this.name, api.getConfigValue(pluginId, 'optionsGroup') + ':enabled');
    api.events.off(this.name, api.getConfigValue(pluginId, 'optionsGroup') + ':disabled');
  }
}
