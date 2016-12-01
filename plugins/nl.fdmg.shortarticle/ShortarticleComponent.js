import ArticleOptionComponent from '../nl.fdmg.articleoption/ArticleOptionComponent'

class ShortarticleComponent extends ArticleOptionComponent {
  constructor(...args) {
    super('shortarticle', 'fdmg/shortarticle', 'Show related articles', ...args)
  }
}

export default ShortarticleComponent
