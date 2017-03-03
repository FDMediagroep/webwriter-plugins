import FDValidator from '../nl.fdmg.fdvalidator/FDValidator';

class PreambleValidator extends FDValidator {
  validate() {
    if (this.submitted || this.published || this.drafted) {
      const preambles = this.newsItem.querySelectorAll('idf > group element[type="preamble"]');
      if (preambles.length > 1) {
        this.addError(this.getLabel('More than one preamble'));
      }
    }
  }
}

export default PreambleValidator;