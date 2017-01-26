import ArticleOptionComponent from '../nl.fdmg.articleoption/ArticleOptionComponent'

class ShowRelatedArticlesComponent extends ArticleOptionComponent {
  constructor(...args) {
    super({
      name: "showrelatedarticles",
      type: "fdmg/showrelatedarticles",
      label: "Show related articles",
      hasInput: false,
    }, ...args)
  }
}

export default ShowRelatedArticlesComponent
