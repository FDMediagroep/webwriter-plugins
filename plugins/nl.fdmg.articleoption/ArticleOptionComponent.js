import DropdownComponent from '../nl.fdmg.dropdown/DropdownComponent';
import './scss/articleoption.scss';

const {Component} = substance;
const {api, idGenerator} = writer;

/**
 * Base class for Checkbox components.
 *
 * When multiple checkbox components has optionsGroup configured with the same value then those checkboxes act as
 * one group. This meaning that only one checkbox in that group can be checked at any moment.
 */
export default class ArticleOptionComponent extends Component {
  constructor(plugin, ...args) {
    super(...args);
    this.name = plugin.name;
    this.type = plugin.type;
    this.label = plugin.label;
    this.hasinput = plugin.hasInput;
    this.hascolorinput = plugin.hasColorInput;
    this.defaultvalue = plugin.defaultValue;
    this.placeholder = plugin.placeholder;
    this.pluginId = plugin.pluginId;
    this.items = plugin.items;
    this.hasSelect = plugin.hasSelect;
    this.extendState(this.getInitialState());

    /**
     * Listeners used for options grouping functionality.
     */
    if(api.getConfigValue(this.pluginId||this.id, 'optionsGroup', this.id)) {
      api.events.on(this.name, api.getConfigValue(this.pluginId || this.id, 'optionsGroup', this.id) + ':enabled', this.enable.bind(this));
      api.events.on(this.name, api.getConfigValue(this.pluginId || this.id, 'optionsGroup', this.id) + ':disabled', this.disable.bind(this));
    }
  }

  /**
   * Override to provide own initial state.
   *
   * @returns {{name: *, checked: (boolean|*), enabled: boolean}}
   */
  getInitialState() {
    return {
      name : this.name,
      checked: this.getOptionChecked(),
      enabled: true
    };
  }

  /**
   * Every component must override this function.
   * Returns a virtual representation of this component which will be used to render the actual DOM element later.
   *
   * @param $$
   * @returns {void|ServerResponse|*}
   */
  render($$) {
    // Construct the checkbox
    const el = $$('div')
    .addClass('fdmg-sidebar').append(
      $$('div')
      .addClass('checkbox form-group')
      .append(
        $$('label')
          .append(
            $$('input')
              .attr('type', 'checkbox')
              .attr(!this.state.enabled ? {'disabled': 'disabled'} : {})
              .attr(this.state.checked ? {'checked': 'checked'} : {})
              .on('change', () => {
                this.setOptionChecked(!this.state.checked)
              }),
              $$('span').append(this.getLabel(this.label))
          )
      ),
      $$('hr').addClass('options-hr')
    );

    // When component is configured to have an input field and this checkbox is checked.
    if (this.hasinput && this.state.checked) {
      // Append an input field.
      el.append(
        $$('input')
          .attr({
            'type': 'text',
            'value': this.state.value||this.defaultvalue,
            'id': this.name,
            'placeholder': this.getLabel(this.placeholder) || ''
          })
          .on('blur', () => {
            this.setOptionChecked(true)
          })
          .ref('input'),
          $$('hr')
      );
    }

    // When component is configured to have a color input field and this checkbox is checked.
    if (this.hascolorinput && this.state.checked) {
      // Append an input field.
      el.append(
        $$('input')
          .attr({
            'list': 'fdColors',
            'type': 'color',
            'value': this.state.value||this.defaultvalue,
            'id': this.name
          })
          .on('blur', () => {
            this.setOptionChecked(true)
          })
          .ref('input'),
          $$('hr')
      );
      // Preset color list
      el.append(
        $$('datalist')
          .attr({
            id: 'fdColors'
          })
          .append(
            $$('option').attr({value: '#19577A'}),
            $$('option').attr({value: '#2CCC94'}),
            $$('option').attr({value: '#DE477F'}),
            $$('option').attr({value: '#FF6066'}),
            $$('option').attr({value: '#7C4DAD'}),
            $$('option').attr({value: '#6086EB'}),
            $$('option').attr({value: '#FF9090'}),
            $$('option').attr({value: '#DEAC6C'}),
            $$('option').attr({value: '#5C39F5'}),
            $$('option').attr({value: '#36DCD7'})
          )
      );

    }

    // Render the items in the dropdown if there are any.
    if (this.hasSelect && this.state.checked && this.state.items) {
      const selection = api.newsItem
        .getLinkByType(this.name, this.type)
        .map(l => { return {id: l['@value']}; })
        .map(i => {
          const match = this.state.items.find(item => item.id === i.id);
          const label = (match !== undefined) ? match.label : i.id;
          return {id: i.id, label: label};
        })
        .pop();

      el.append(
        $$(DropdownComponent, {
          onSelect: this.update.bind(this),
          items: this.state.items,
          allowFreeInput: false,
          allowEmptySelection: false,
          selection: selection
        }),
        $$('hr')
      );
    }
    return el;
  }

  /**
   * Called when selection in dropdown has changed.
   *
   * @param item
   */
  update(item) {
    // Remove from NewsML representation.
    api.newsItem
      .getLinkByType(this.name, this.type)
      .forEach(l => {
        api.newsItem.removeLinkByUUIDAndRel(this.name, l['@uuid'], l['@rel']);
      });

    // Add to NewsML representation.
    if (item.id !== 'none' && item.label.trim() !== '') {
      // Update selection. Checked should be true
      api.newsItem.addLink(this.name, {
        '@rel': this.name,
        '@type': this.type,
        '@value': item.id,
        '@checked': 'true',
        '@uuid': idGenerator()
      });
    }
  }

  /**
   * Return the checked-state of this component.
   * @returns {boolean|*}
   */
  getOptionChecked() {
    return api.newsItem
      .getLinkByType(this.name, this.type)
      .some(i => i['@checked'] === "true");
  }

  /**
   * Set the checked-state of this component and update other components in the same `optionsGroup`.
   * @param checked
   */
  setOptionChecked(checked) {
    // Clear existing links of this type (from the NewsML representation)
    api.newsItem
      .getLinkByType(this.name, this.type)
      .forEach(l => {
        api.newsItem.removeLinkByUUIDAndRel(this.name, l['@uuid'], l['@rel'])
      });

    const value = 'input' in this.refs ? this.refs.input.val() : '';

    let link = {
      '@rel': this.name,
      '@type': this.type,
      '@checked': checked,
      '@uuid': idGenerator()
    };

    if (this.hasinput || this.hascolorinput || this.hasSelect && checked) {
      link['@value'] = value;
    }

    // Add the link (to NewsML representation)
    api.newsItem.addLink(this.name, link);

    // Set state.
    this.extendState({
      checked: checked,
      value: value
    });

    this.updateOtherOptions();
  }

  /**
   * Determine current state and use that to update other components in the same `optionsGroup`.
   */
  updateOtherOptions() {
    const eventState = this.state.checked ? 'disabled' : 'enabled';
    api.events.triggerEvent('', api.getConfigValue(this.pluginId||this.id, 'optionsGroup') + `:${eventState}`, this.name);
  }

  /**
   * Enable this component.
   */
  enable() {
    this.extendState({enabled: true});
  }

  /**
   * Set state for this component to disabled if the event is not initiated by this component itself.
   */
  disable() {
    if(this.name !== arguments[0].data) {
      this.extendState({enabled: false});
    }
  }

  /**
   * Remove listeners when this plugin is unloaded (happens when tab is no longer active).
   */
  dispose() {
    api.events.off(this.name, api.getConfigValue(this.pluginId||this.id, 'optionsGroup') + ':enabled');
    api.events.off(this.name, api.getConfigValue(this.pluginId||this.id, 'optionsGroup') + ':disabled');
  }
}
