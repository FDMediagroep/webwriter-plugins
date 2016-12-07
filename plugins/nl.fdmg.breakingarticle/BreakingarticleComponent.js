import ArticleOptionComponent from '../nl.fdmg.articleoption/ArticleOptionComponent'

class BreakingarticleComponent extends ArticleOptionComponent {
  constructor(...args) {
    super('breakingarticle', 'fdmg/breakingarticle', 'Breaking article', false, '' , '', ...args)
  }
}

export default BreakingarticleComponent
