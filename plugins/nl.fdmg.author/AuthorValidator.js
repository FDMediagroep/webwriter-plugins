import FDValidator from '../nl.fdmg.fdvalidator/FDValidator';

class AuthorValidator extends FDValidator {
  validate() {
    if (this.isShortArticle || this.isAdvertorial || this.isEvents || this.isRedirectArticle || this.isServicePage) return;


    if (this.drafted || this.submitted || this.published) {
      const authors = this.newsItem.querySelectorAll('itemMeta > links link[type="x-im/author"]');

      if (authors.length === 0) {
        this.addError(this.getLabel('Missing author'));
      }
    }
  }
}

export default AuthorValidator;
