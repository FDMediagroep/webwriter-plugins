import FDValidator from '../nl.fdmg.fdvalidator/FDValidator'

class TextAnalyzerValidator extends FDValidator {
  validate() {
    if (this.submitted || this.published) {
      const textAnalyzerIndicator = document.getElementById('textanalyzer-indicator')

      if (textAnalyzerIndicator) {
        const classes = Array.from(textAnalyzerIndicator.classList)

        if (classes.indexOf('under-range') !== -1) {
          this.addWarning(this.getLabel('Not enough characters'))
        } else if (classes.indexOf('over-range') !== -1) {
          this.addWarning(this.getLabel('Too many characters'))
        }
      }
    }
  }
}

export default TextAnalyzerValidator