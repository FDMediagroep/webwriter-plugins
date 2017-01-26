import FDValidator from '../nl.fdmg.fdvalidator/FDValidator'
import {api} from 'writer'

class TextcountSelectorValidator extends FDValidator {
  validate() {
    if (this.isShortArticle || this.isAdvertorial || this.isEvents || this.isRedirectArticle) return

    if (this.submitted || this.published) {
      const textcount = this.newsItem.querySelector('itemMeta > links link[type="fdmg/textcount"]')
      const availableSizes = api.getConfigValue('nl.fdmg.textcount', 'sizes', [])

      if (!textcount) {
        this.addError(this.getLabel('Missing text length'))
      } else {
        const size = textcount.attributes['size'].value
        if (!size || availableSizes.some(s => size === s.size)) {
          this.addError('Missing text length')
        }
      }
    }
  }
}

export default TextcountSelectorValidator
