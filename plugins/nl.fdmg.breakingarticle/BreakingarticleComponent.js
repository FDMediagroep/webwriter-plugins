import ArticleOptionComponent from '../nl.fdmg.articleoption/ArticleOptionComponent'

class BreakingarticleComponent extends ArticleOptionComponent {
  constructor(...args) {
    super('breakingarticle', 'fdmg/breakingarticle', 'Breaking article', ...args)
  }
}

export default BreakingarticleComponent
