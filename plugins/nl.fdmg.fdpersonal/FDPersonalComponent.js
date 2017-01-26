import ArticleOptionComponent from '../nl.fdmg.articleoption/ArticleOptionComponent'

class FDPersonalComponent extends ArticleOptionComponent {
  constructor(...args) {
    super({
      name: "fdpersonal",
      type: "fdmg/fdpersonal",
      label: "FD Personal",
      hasInput: false
    }, ...args)
  }
}

export default FDPersonalComponent
