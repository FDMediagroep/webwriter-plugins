import FDValidator from '../nl.fdmg.fdvalidator/FDValidator'

class HtmlEmbedValidator extends FDValidator {
  validate() {
    if (this.isShortArticle || this.isAdvertorial || this.isEvents || this.isRedirectArticle) return
    
    if (this.submitted || this.published) {
      const htmlembeds = this.newsItem.querySelectorAll('idf > group object[type="fdmg/htmlembed"] text')

      Array.from(htmlembeds)
      .map(node => node.textContent)
      .filter(text => text.trim() === '')
      .forEach((_, i) => {
        this.addError(this.getLabel('Empty HTML embed') + ` ( ${i + 1} )`)
      })
    }
  }
}

export default HtmlEmbedValidator
