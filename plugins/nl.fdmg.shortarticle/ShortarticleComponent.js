import ArticleOptionComponent from '../nl.fdmg.articleoption/ArticleOptionComponent'

class ShortarticleComponent extends ArticleOptionComponent {
  constructor(...args) {
    super('shortarticle', 'fdmg/shortarticle', 'Short article', ...args)
  }
}

export default ShortarticleComponent
