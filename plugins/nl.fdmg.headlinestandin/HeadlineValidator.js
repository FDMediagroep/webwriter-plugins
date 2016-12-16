import FDValidator from '../nl.fdmg.fdvalidator/FDValidator'

class HeadlineValidator extends FDValidator {
  validate() {
    if (this.submitted || this.published) {
      const headlines = this.newsItem.querySelectorAll('idf > group element[type="headline"]')
      if (headlines.length === 1) {
        headlines.forEach(headline => {
          if (headline.textContent.trim() === '') {
            this.addError(this.getLabel('Missing headline'))
          }
        })
      } else if (headlines.length < 1) {
        this.addError(this.getLabel('Missing headline'))
      } else if (headlines.length > 1) {
        this.addError(this.getLabel('More than one headline'))
      }
    }
  }
}

export default HeadlineValidator
