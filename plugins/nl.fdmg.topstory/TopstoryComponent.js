import ArticleOptionComponent from '../nl.fdmg.articleoption/ArticleOptionComponent'

class TopstoryComponent extends ArticleOptionComponent {
  constructor(...args) {
    super({
      name: "topstory",
      type: "fdmg/topstory",
      label: "Topstory",
      hasInput: false
    }, ...args)
  }
}

export default TopstoryComponent
