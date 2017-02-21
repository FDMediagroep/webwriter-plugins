import FDValidator from '../nl.fdmg.fdvalidator/FDValidator'

class TextFrameValidator extends FDValidator {
  validate() {
    if (this.isShortArticle || this.isAdvertorial || this.isEvents || this.isRedirectArticle || this.isServicePage) return

    if (this.published) {
      const tags = Array.from(this.newsItem.querySelectorAll('itemMeta > links link[type="x-im/category"]'))

      if (tags.length <= 0) {
        this.addWarning(this.getLabel('Missing tags'))
      }
    }
  }
}

export default TextFrameValidator
