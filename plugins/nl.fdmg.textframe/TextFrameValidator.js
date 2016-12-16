import FDValidator from '../nl.fdmg.fdvalidator/FDValidator'

class TextFrameValidator extends FDValidator {
  validate() {
    if (this.submitted || this.published) {
      if (this.submitted || this.published) {
        const textframes = Array.from(this.newsItem.querySelectorAll('object[type="fdmg/textframe"]'));

        textframes.forEach((tf, i) => {

          const title = tf.attributes.getNamedItem('title');
          tf.querySelector('data>text');

          if (!title || title.value.trim() === '') {
            this.addError(`${this.getLabel('Textframe is missing title')} (${i + 1})`);
          }
        })
      }
    }
  }
}

export default TextFrameValidator
