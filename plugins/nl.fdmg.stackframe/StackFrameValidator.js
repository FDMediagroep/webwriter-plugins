import FDValidator from '../nl.fdmg.fdvalidator/FDValidator'
import {api} from 'writer';

export default class StackFrameValidator extends FDValidator {
  validate() {
    // Validate Stackframe
    const stackFrames = this.newsItem.querySelectorAll('object[type="fdmg/stackframe"]');
    if ((this.submitted || this.published) && stackFrames.length) {
      // Textframe title
      let stackFrameHeadingNodes = Array.from(this.newsItem.querySelectorAll('object[type="fdmg/stackframe"] heading'));
      let emptyStackFrameText = stackFrameHeadingNodes.map((x)=>x.innerHTML.trim()).filter((x) => !x);
      if (emptyStackFrameText.length || stackFrames.length !== stackFrameHeadingNodes.length) this.addError(api.getLabel("No stackframe heading"));

      // StackFrame text
      let stackFrameContentNodes = Array.from(this.newsItem.querySelectorAll('object[type="fdmg/stackframe"] content'));
      let emptyStackFrameContent = stackFrameContentNodes.map((x)=>x.innerHTML.trim()).filter((x) => !x);
      if (emptyStackFrameContent.length || stackFrames.length !== stackFrameContentNodes.length) this.addError(api.getLabel("No stackframe content"));
    }
  }
}
