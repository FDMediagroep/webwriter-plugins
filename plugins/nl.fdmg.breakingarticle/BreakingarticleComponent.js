import ArticleOptionComponent from '../nl.fdmg.articleoption/ArticleOptionComponent';

class BreakingarticleComponent extends ArticleOptionComponent {
  constructor(...args) {
    super({
      name: "breakingarticle",
      type: "fdmg/breakingarticle",
      label: "Breaking article",
      pluginId: 'nl.fdmg.breakingarticle',
      hasInput: false
    }, ...args)
  }
}

export default BreakingarticleComponent;
