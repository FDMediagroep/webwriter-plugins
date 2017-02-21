import ArticleOptionComponent from '../nl.fdmg.articleoption/ArticleOptionComponent'

class ShowRelatedArticlesComponent extends ArticleOptionComponent {
  constructor(...args) {
    super({
      name: "showrelatedarticles",
      type: "fdmg/showrelatedarticles",
      label: "Show related articles",
      pluginId: 'nl.fdmg.showrelatedarticles',
      hasInput: false,
    }, ...args)
  }
}

export default ShowRelatedArticlesComponent
