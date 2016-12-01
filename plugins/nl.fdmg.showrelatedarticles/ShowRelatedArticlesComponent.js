import ArticleOptionComponent from '../nl.fdmg.articleoption/ArticleOptionComponent'

class ShowRelatedArticlesComponent extends ArticleOptionComponent {
  constructor(...args) {
    super('showrelatedarticles', 'fdmg/showrelatedarticles', 'Show related articles', ...args)
  }
}

export default ShowRelatedArticlesComponent
