import ArticleOptionComponent from '../nl.fdmg.articleoption/ArticleOptionComponent'

class PaywallComponent extends ArticleOptionComponent {
  constructor(...args) {
    super('paywall', 'fdmg/paywall', 'Free article', false, '' , '', ...args)
  }
}

export default PaywallComponent
