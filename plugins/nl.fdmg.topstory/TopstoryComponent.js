import ArticleOptionComponent from '../nl.fdmg.articleoption/ArticleOptionComponent'

class TopstoryComponent extends ArticleOptionComponent {
  constructor(...args) {
    super('topstory', 'fdmg/topstory', 'Topstory', true, '', 'Topstory text', ...args)
  }
}

export default TopstoryComponent
