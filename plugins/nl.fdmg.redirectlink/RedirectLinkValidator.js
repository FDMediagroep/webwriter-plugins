import FDValidator from '../nl.fdmg.fdvalidator/FDValidator';

class RedirectLinkValidator extends FDValidator {
  validate() {
    if (this.isShortArticle || this.isAdvertorial || this.isEvents) return;

    if (this.drafted || this.submitted || this.published) {
      const redirectlink = this.newsItem.querySelector('itemMeta > links link[type="fdmg/redirectlink"]');

      if (redirectlink) {
        const as = redirectlink.attributes

        const checked = as.hasOwnProperty('checked') && as.getNamedItem('checked').value === 'true';
        const value = as.hasOwnProperty('value') ? as.getNamedItem('value').value.trim() : '';

        if (checked) {
          if (!value) {
            this.addError(this.getLabel('Redirect link is missing a value'))
          } else {
            const validUrlRe = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
            if (!validUrlRe.test(value)) {
              this.addError(this.getLabel('Redirect link is not a valid url'))
            }
          }
        }
      }
    }
  }
}

export default RedirectLinkValidator;
