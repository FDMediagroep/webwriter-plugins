import ArticleOptionComponent from '../nl.fdmg.articleoption/ArticleOptionComponent'

class TopstoryComponent extends ArticleOptionComponent {
  constructor(...args) {
    super('topstory', 'fdmg/topstory', 'Topstory', ...args)
  }
}

export default TopstoryComponent
