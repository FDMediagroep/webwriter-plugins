import ArticleOptionComponent from '../nl.fdmg.articleoption/ArticleOptionComponent';

class ShortarticleComponent extends ArticleOptionComponent {
  constructor(...args) {
    super({
      name: "shortarticle",
      type: "fdmg/shortarticle",
      label: "Short article",
      pluginId: 'nl.fdmg.shortarticle',
      hasInput: false
    }, ...args);
  }
}

export default ShortarticleComponent;
