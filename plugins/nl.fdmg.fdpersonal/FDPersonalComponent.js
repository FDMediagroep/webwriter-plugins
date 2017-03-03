import ArticleOptionComponent from '../nl.fdmg.articleoption/ArticleOptionComponent';

class FDPersonalComponent extends ArticleOptionComponent {
  constructor(...args) {
    super({
      name: "fdpersonal",
      type: "fdmg/fdpersonal",
      label: "FD Personal",
      pluginId: 'nl.fdmg.fdpersonal',
      hasInput: false
    }, ...args);
  }
}

export default FDPersonalComponent;
