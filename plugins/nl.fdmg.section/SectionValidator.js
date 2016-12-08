import FDValidator from '../nl.fdmg.fdvalidator/FDValidator'
import {api} from 'writer'

class SectionValidator extends FDValidator {
  validate() {
    const section = this.newsItem.querySelector('itemMeta > links link[type="fdmg/section"]')

    if (!section) {
      this.addError(api.getLabel('Missing section'))
    }
  }
}

export default SectionValidator
