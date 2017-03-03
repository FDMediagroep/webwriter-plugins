import FDValidator from '../nl.fdmg.fdvalidator/FDValidator';

class NumberFrameValidator extends FDValidator {
  validate() {
    if (this.isShortArticle || this.isAdvertorial || this.isEvents || this.isRedirectArticle) return;

    if (this.submitted || this.published) {
      // Validate Numberframe
      const numberFrames = this.newsItem.querySelectorAll('object[type="fdmg/numberframe"]');
      if ((this.submitted || this.published) && numberFrames.length) {

        // Textframe title
        let numberFrameHeadingNodes = Array.from(this.newsItem.querySelectorAll('object[type="fdmg/numberframe"] heading'));
        let emptyNumberFrameHeading = numberFrameHeadingNodes.map((x)=>x.innerHTML.trim()).filter((x) => !x);
        if (emptyNumberFrameHeading.length || numberFrames.length !== numberFrameHeadingNodes.length) this.addError(this.getLabel("No numberframe heading"));

        // StackFrame text
        let numberFrameContentNodes = Array.from(this.newsItem.querySelectorAll('object[type="fdmg/numberframe"] content'));
        let emptyStackFrameContent = numberFrameContentNodes.map((x)=>x.innerHTML.trim()).filter((x) => !x);
        if (emptyStackFrameContent.length || numberFrames.length !== numberFrameContentNodes.length) this.addError(this.getLabel("No numberframe content"));
      }
    }
  }
}

export default NumberFrameValidator;
