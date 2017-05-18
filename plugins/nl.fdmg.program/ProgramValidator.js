import FDValidator from '../nl.fdmg.fdvalidator/FDValidator';

class ProgramValidator extends FDValidator {
  validate() {
    if (this.drafted || this.submitted || this.published) {
      const advertorial = this.newsItem.querySelector('itemMeta > links link[type="fdmg/advertorial"]');

      if (advertorial) {
        const as = advertorial.attributes;

        const checked = as.hasOwnProperty('checked') ? as.getNamedItem('checked').value === 'true' : false;
        const value = as.hasOwnProperty('value') ? as.getNamedItem('value').value.trim() : '';

        if (checked && !value) {
          this.addError(`${this.getLabel('Program value missing')}`);
        }
      }
    }
  }
}

export default ProgramValidator;
