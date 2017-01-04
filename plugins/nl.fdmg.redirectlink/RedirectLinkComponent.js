import ArticleOption from '../nl.fdmg.articleoption/ArticleOptionComponent';
import {api} from 'writer';
import './scss/redirectlink.scss';

export default class RedirectLinkComponent extends ArticleOption {
  constructor(...args) {
    super({
      name: "redirectlink",
      type: "fdmg/redirectlink",
      label: "Redirect article",
      hasInput: true,
      placeholder: 'URL to article',
      pluginId: 'nl.fdmg.redirectlink' // Very important to set this; used by parent class in getConfigValue
    }, ...args);
  }

  /**
   * Called when the element is inserted into the DOM.
   */
  didMount(){
    this.extendState({
      value: api.newsItem
        .getLinkByType(this.name, this.type)
        .map(i => i['@value'])
        .pop()
    });

    // Important to call `super` and not `this`. `this` would return the wrong instance. The effect would be the sames
    // as calling a static property of a class thus returning the value set by other classes.
    // To understand this better you'll need to delve deeper into documentation about prototypical inheritance.
    // There is also no need to update the other components in the same optionsGroup if this component is not checked.
    if(super.getOptionChecked()) {
      this.updateOtherOptions();
    }
  }

}
