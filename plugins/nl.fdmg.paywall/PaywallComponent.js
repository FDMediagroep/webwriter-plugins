import ArticleOptionComponent from '../nl.fdmg.articleoption/ArticleOptionComponent'

class PaywallComponent extends ArticleOptionComponent {
  constructor(...args) {
    super({
      name: "paywall",
      type: "fdmg/paywall",
      label: "Free article",
      hasInput: false,
    }, ...args)
  }
}

export default PaywallComponent
