import FDValidator from '../nl.fdmg.fdvalidator/FDValidator'
import {api} from 'writer'

class AdvertorialValidator extends FDValidator {
  validate() {
    const advertorial = this.newsItem.querySelector('itemMeta > links link[type="fdmg/advertorial"]')

    if (advertorial) {
      const as = advertorial.attributes

      const checked = as.hasOwnProperty('checked') ? as.getNamedItem('checked').value === 'true' : false
      const value = as.hasOwnProperty('value') ? as.getNamedItem('value').value.trim() : ''

      if (checked && !value) {
        this.addError(`${api.getLabel('Advertorial value missing')}`)
      }
    }
  }
}

export default AdvertorialValidator
