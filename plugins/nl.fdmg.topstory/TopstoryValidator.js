import FDValidator from '../nl.fdmg.fdvalidator/FDValidator';

class TopstoryValidator extends FDValidator {
  validate() {
    if (this.isShortArticle || this.isAdvertorial || this.isEvents || this.isRedirectArticle) return;

    if (this.drafted || this.submitted || this.published) {
      const topstory = this.newsItem.querySelector('itemMeta > links link[type="fdmg/topstory"]');

      if (topstory) {
        const as = topstory.attributes;

        const checked = as.hasOwnProperty('checked') ? as.getNamedItem('checked').value === 'true' : false;
        const value = as.hasOwnProperty('value') ? as.getNamedItem('value').value.trim() : '';

        if (checked && !value) {
          this.addError(`${this.getLabel('Topstory is missing a value')}`);
        }
      }
    }
  }
}

export default TopstoryValidator;
