import FDValidator from '../nl.fdmg.fdvalidator/FDValidator'

class SectionValidator extends FDValidator {
  validate() {
    if (this.isAdvertorial || this.isEvents || this.isRedirectArticle) return

    if (this.drafted || this.submitted || this.published) {
      const section = this.newsItem.querySelector('itemMeta > links link[type="fdmg/section"]')

      if (!section) {
        this.addError(this.getLabel('Missing section'))
      }
    }
  }
}

export default SectionValidator
