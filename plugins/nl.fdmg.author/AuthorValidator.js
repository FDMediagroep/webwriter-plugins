import FDValidator from '../nl.fdmg.fdvalidator/FDValidator'
import {api} from 'writer'

class AuthorValidator extends FDValidator {
  validate() {
    const authors = this.newsItem.querySelectorAll('itemMeta > links link[type="x-im/author"]')

    if (authors.length === 0) {
      this.addError(`${api.getLabel('Missing author')}`)
    }
  }
}

export default AuthorValidator
