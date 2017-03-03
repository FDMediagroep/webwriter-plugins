import FDValidator from '../nl.fdmg.fdvalidator/FDValidator';

class XimImageValidator extends FDValidator {
  validate() {
    if (this.isShortArticle || this.isAdvertorial || this.isEvents || this.isRedirectArticle) return;

    if (this.submitted || this.published) {
      const images = this.newsItem.querySelectorAll('idf > group object[type="x-im/image"]');

      images.forEach((image, idx) => {
        const credit = image.querySelector('credit');

        if (!credit || credit.textContent.trim() === '') {
          this.addWarning(this.getLabel('Image is missing credit') + ` ( ${idx + 1} )`);
        }
      })
    }
  }
}

export default XimImageValidator;
