import ArticleOptionComponent from '../nl.fdmg.articleoption/ArticleOptionComponent'

class CommentsComponent extends ArticleOptionComponent {
  constructor(...args) {
    super({
      name: "comments",
      type: "fdmg/comments",
      label: "Enable comments",
      hasInput: false
    }, ...args)
  }
}

export default CommentsComponent
