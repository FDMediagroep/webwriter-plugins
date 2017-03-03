import ArticleOptionComponent from '../nl.fdmg.articleoption/ArticleOptionComponent';

class FullWidthComponent extends ArticleOptionComponent {
  constructor(...args) {
    super({
      name: "fullwidth",
      type: "fdmg/fullwidth",
      label: "Full width article",
      pluginId: 'nl.fdmg.fullwidth',
      hasInput: false
    }, ...args);
  }
}

export default FullWidthComponent;
