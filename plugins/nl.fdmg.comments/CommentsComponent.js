import ArticleOptionComponent from '../nl.fdmg.articleoption/ArticleOptionComponent'

class CommentsComponent extends ArticleOptionComponent {
  constructor(...args) {
    super('comments', 'fdmg/comments', 'Enable comments', ...args)
  }
}

export default CommentsComponent
