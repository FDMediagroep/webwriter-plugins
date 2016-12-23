import FDValidator from '../nl.fdmg.fdvalidator/FDValidator'

class TextframeValidator extends FDValidator {
  validate() {
    if (this.isShortArticle || this.isAdvertorial || this.isEvents || this.isRedirectArticle) return

    if (this.drafted || this.submitted || this.published) {
      this.newsItem
        .querySelectorAll('object[type="fdmg/textframe"]')
        .forEach((tf, idx) => {
          const text = tf.querySelector('text')
          if (!text || text.textContent.trim() === '') {
            this.addError(this.getLabel('Missing textframe text') + ` ( ${idx + 1} )`)
          }
        })
    }
  }
}

export default TextframeValidator
