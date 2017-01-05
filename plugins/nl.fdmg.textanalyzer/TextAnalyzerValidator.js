import FDValidator from '../nl.fdmg.fdvalidator/FDValidator';

export default class TextAnalyzerValidator extends FDValidator {
  validate() {
    if (this.isShortArticle || this.isAdvertorial || this.isEvents || this.isRedirectArticle) return;

    if (this.submitted || this.published) {
      const textAnalyzerIndicator = document.getElementById('textanalyzer-indicator');

      if (textAnalyzerIndicator) {
        const classes = Array.from(textAnalyzerIndicator.classList);

        if (classes.indexOf('over-range') !== -1) {
          this.addWarning(this.getLabel('Too many characters'));
        }
      }
    }
  }
}
