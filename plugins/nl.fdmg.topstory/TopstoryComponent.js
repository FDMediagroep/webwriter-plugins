import ArticleOptionComponent from '../nl.fdmg.articleoption/ArticleOptionComponent'
import './scss/topstory.scss'

class TopstoryComponent extends ArticleOptionComponent {
  constructor(...args) {
    super({
      name: "topstory",
      type: "fdmg/topstory",
      label: "Topstory",
      hasInput: true
    }, ...args)
  }
}

export default TopstoryComponent
