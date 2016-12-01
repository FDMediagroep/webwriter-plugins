import ArticleOptionComponent from '../nl.fdmg.articleoption/ArticleOptionComponent'

class FDPersonalComponent extends ArticleOptionComponent {
  constructor(...args) {
    super('fdpersonal', 'fdmg/fdpersonal', 'FD Personal', ...args)
  }
}

export default FDPersonalComponent
