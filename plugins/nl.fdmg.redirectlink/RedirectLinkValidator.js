import FDValidator from '../nl.fdmg.fdvalidator/FDValidator'
import {api} from 'writer'

class RedirectLinkValidator extends FDValidator {
  validate() {
    const redirectlink = this.newsItem.querySelector('itemMeta > links link[type="fdmg/redirectlink"]')

    if (redirectlink) {
      const as = redirectlink.attributes

      const checked = as.hasOwnProperty('checked') && as.getNamedItem('checked').value === 'true'
      const value = as.hasOwnProperty('value') ? as.getNamedItem('value').value.trim() : ''

      if (checked) {
        if (!value) {
          this.addError(api.getLabel('Redirect link is missing a value'))
        } else {
          const validUrlRe = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
          if (!validUrlRe.test(value)) {
            this.addError(api.getLabel('Redirect link is not a valid url'))
          }
        }
      }
    }


    // TODO Implement  validation

    /*
    const i18n = this.context.i18n
    const qcode = this.context.api.getPubStatus().qcode
    const drafted = (qcode == 'imext:draft')
    const submitted = (qcode == 'stat:withheld' || qcode == 'imext:done')
    const published = (qcode == 'stat:usable')

    const messages = []

    const redirectlink = newsItem.querySelector('itemMeta > links link[type="fdmg/redirectlink"]')

    if (redirectlink.attributes.getNamedItem('checked').value == 'true') {
      const validUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
      const valueItem = redirectlink.attributes.getNamedItem('value')
      const value = valueItem ? valueItem.value : ''

      if (!validUrl.test(value)) {
        messages.push({message: `${i18n.t('Redirect link is not a valid url')}`, type: 'error'})
      }
    }
    return messages
    */
  }
}

export default RedirectLinkValidator
