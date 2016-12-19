import FDValidator from '../nl.fdmg.fdvalidator/FDValidator'

class StackFrameValidator extends FDValidator {
  validate() {
    if (this.isShortArticle || this.isAdvertorial || this.isEvents || this.isRedirectArticle) return
    
    if (this.submitted || this.published) {
      // Validate Stackframe
      const stackFrames = this.newsItem.querySelectorAll('object[type="fdmg/stackframe"]');
      if ((this.submitted || this.published) && stackFrames.length) {
        // Textframe title
        let stackFrameHeadingNodes = Array.from(this.newsItem.querySelectorAll('object[type="fdmg/stackframe"] heading'));
        let emptyStackFrameText = stackFrameHeadingNodes.map((x)=>x.innerHTML.trim()).filter((x) => !x);
        if (emptyStackFrameText.length || stackFrames.length !== stackFrameHeadingNodes.length) this.addError(this.getLabel("No stackframe heading"));

        // StackFrame text
        let stackFrameContentNodes = Array.from(this.newsItem.querySelectorAll('object[type="fdmg/stackframe"] content'));
        let emptyStackFrameContent = stackFrameContentNodes.map((x)=>x.innerHTML.trim()).filter((x) => !x);
        if (emptyStackFrameContent.length || stackFrames.length !== stackFrameContentNodes.length) this.addError(this.getLabel("No stackframe content"));
      }
    }
  }
}

export default StackFrameValidator
