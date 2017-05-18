import ArticleOption from '../nl.fdmg.articleoption/ArticleOptionComponent';
import {api} from 'writer';

export default class AdvertorialComponent extends ArticleOption {

  constructor(...args) {
    super({
      name: "program",
      type: "fdmg/program",
      label: "Programma",
      placeholder: 'URL to program',
      hasSelect: true,
      pluginId: 'nl.fdmg.program', // Very important to set this; used by parent class in getConfigValue
      items: []
    }, ...args);
  }

  /**
   * Called when the element is inserted into the DOM.
   */
  didMount(){
    const endpoint = api.getConfigValue(this.pluginId, 'endpoint');
    const token = api.getConfigValue(this.pluginId, 'token');

    // Makes call to webservice to populate the dropdown.
    fetch(endpoint, {
      method: 'GET',
      headers: {
        'x-access-token': `Bearer ${token}`
      }
    })
    .then(response => api.router.checkForOKStatus(response))
    .then(response => api.router.toJson(response))
    .then(response => response.map(x => {return {id: x, label: x}}))
    .then(response => { this.extendState({items: response}) });

    // Important to call `super` and not `this`. `this` would return the wrong instance. The effect would be the sames
    // as calling a static property of a class thus returning the value set by other classes.
    // To understand this better you'll need to delve deeper into documentation about prototypical inheritance.
    // There is also no need to update the other components in the same optionsGroup if this component is not checked.
    if(super.getOptionChecked()) {
      this.updateOtherOptions();
    }
  }
}
