import FDValidator from '../nl.fdmg.fdvalidator/FDValidator';

export default class ServicePageValidator extends FDValidator {
  validate() {
    if (this.drafted || this.submitted || this.published) {
      const item = this.newsItem.querySelector('itemMeta > links link[type="fdmg/servicepage"]');

      if (item) {
        const as = item.attributes;

        const checked = as.hasOwnProperty('checked') ? as.getNamedItem('checked').value === 'true' : false;
        const value = as.hasOwnProperty('value') ? as.getNamedItem('value').value.trim() : '';

        if (checked && !value) {
          this.addError(`${this.getLabel('Service Page value missing')}`);
        }
      }
    }
  }
}
