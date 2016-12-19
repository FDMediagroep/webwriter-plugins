import FDValidator from '../nl.fdmg.fdvalidator/FDValidator'

class XimTeaserValidator extends FDValidator {
  validate() {
    if (this.published) {
      const teasers = this.newsItem.querySelectorAll('contentMeta > metadata object[type="x-im/teaser"]')

      if (teasers.length === 1) {
        if (this.published) {
          teasers.forEach(teaser => {
            const text = teaser.querySelector('data > text')
            if (!text || text.textContent.trim() === '') {
              this.addError(this.getLabel('Missing teaser body'))
            }
          })
        }
      } else if (teasers.length < 1) {
        this.addError(this.getLabel('Missing teaser'))
      } else if (teasers.length > 1) {
        this.addError(this.getLabel('More than one teaser'))
      }
    }
  }
}

export default XimTeaserValidator
