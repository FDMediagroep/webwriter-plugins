import ArticleOptionComponent from '../nl.fdmg.articleoption/ArticleOptionComponent'

class DoNotIndexComponent extends ArticleOptionComponent {
  constructor(...args) {
    super('donotindex', 'fdmg/donotindex', 'Do not index', false, '' , '', ...args)
  }
}

export default DoNotIndexComponent
