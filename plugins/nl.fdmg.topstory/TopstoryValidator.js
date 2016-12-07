import FDValidator from '../nl.fdmg.fdvalidator/FDValidator'
import {api} from 'writer'

class TopstoryValidator extends FDValidator {
  validate() {
    const topstory = this.newsItem.querySelector('itemMeta > links link[type="fdmg/topstory"]')

    if (topstory) {
      const as = topstory.attributes

      const checked = as.hasOwnProperty('checked') ? as.getNamedItem('checked').value === 'true' : false
      const value = as.hasOwnProperty('value') ? as.getNamedItem('value').value.trim() : ''

      if (checked && !value) {
        this.addError(`${api.getLabel('Topstory is missing a value')}`)
      }
    }
  }
}

export default TopstoryValidator
