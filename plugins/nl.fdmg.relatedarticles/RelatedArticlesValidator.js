import FDValidator from '../nl.fdmg.fdvalidator/FDValidator'

class RelatedArticlesValidator extends FDValidator {
  validate() {
    if (this.isShortArticle || this.isAdvertorial || this.isEvents) return

    if (this.drafted || this.submitted || this.published) {
      const relatedarticles = this.newsItem.querySelectorAll('itemMeta > links link[type="fdmg/relatedarticle"]')

      relatedarticles.forEach((link, index) => {
        const id = link.attributes.getNamedItem('id')
        if (!id || id.value.trim() === '') {
          this.addError(`${this.getLabel('Related article url is invalid')} (${index + 1})`)
        }
      })
    }
  }
}

export default RelatedArticlesValidator
