import ArticleOptionComponent from '../nl.fdmg.articleoption/ArticleOptionComponent'

class PaywallComponent extends ArticleOptionComponent {
  constructor(...args) {
    super({
      name: "paywall",
      type: "fdmg/paywall",
      label: "Free article",
      pluginId: 'nl.fdmg.paywall',
      hasInput: false,
    }, ...args)
  }
}

export default PaywallComponent
