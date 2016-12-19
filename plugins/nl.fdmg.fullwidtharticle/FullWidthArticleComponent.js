import ArticleOptionComponent from '../nl.fdmg.articleoption/ArticleOptionComponent'

class FullWidthArticleComponent extends ArticleOptionComponent {
  constructor(...args) {
    super({
      name: "fullwidtharticle",
      type: "fdmg/fullwidtharticle",
      label: "Do not index",
      hasInput: false
    }, ...args)
  }
}

export default FullWidthArticleComponent
