import ArticleOptionComponent from '../nl.fdmg.articleoption/ArticleOptionComponent';

class DoNotIndexComponent extends ArticleOptionComponent {
  constructor(...args) {
    super({
      name: "donotindex",
      type: "fdmg/donotindex",
      label: "Do not index",
      pluginId: 'nl.fdmg.donotindex',
      hasInput: false
    }, ...args);
  }
}

export default DoNotIndexComponent;
