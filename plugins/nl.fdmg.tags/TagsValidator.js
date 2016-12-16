import FDValidator from '../nl.fdmg.fdvalidator/FDValidator'

class TextFrameValidator extends FDValidator {
  validate() {
    const tags = Array.from(this.newsItem.querySelectorAll('itemMeta > links link[type="x-im/category"]'))

    if (tags.length <= 0) {
      this.addWarning(this.getLabel('Missing tags'))
    }
  }
}

export default TextFrameValidator
