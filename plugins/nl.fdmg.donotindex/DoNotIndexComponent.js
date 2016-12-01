import ArticleOptionComponent from '../nl.fdmg.articleoption/ArticleOptionComponent'

class DoNotIndexComponent extends ArticleOptionComponent {
  constructor(...args) {
    super('donotindex', 'fdmg/donotindex', 'Do not index', ...args)
  }
}

export default DoNotIndexComponent
