import FDValidator from '../nl.fdmg.fdvalidator/FDValidator'
import {api} from 'writer'

class RelatedArticlesValidator extends FDValidator {
  validate() {
    const relatedarticles = this.newsItem.querySelectorAll('itemMeta > links link[type="fdmg/relatedarticle"]')

    relatedarticles.forEach((link, index) => {
      const id = link.attributes.getNamedItem('id')
      if (!id || id.value.trim() === '') {
        this.addError(`${api.getLabel('Related article url is invalid')} (${index + 1})`)
      }
    })
  }
}

export default RelatedArticlesValidator
