import FDValidator from '../nl.fdmg.fdvalidator/FDValidator';

class QuoteValidator extends FDValidator {
  validate() {
    if (this.isShortArticle || this.isAdvertorial || this.isEvents || this.isRedirectArticle) return
    
    if (this.submitted || this.published) {
      // Validate Quote
      const quotes = this.newsItem.querySelectorAll('object[type="fdmg/quote"]');
      if ((this.submitted || this.published) && quotes.length) {

        // Quote text
        let quoteMessageNodes = Array.from(this.newsItem.querySelectorAll('object[type="fdmg/quote"] message'));
        let emptyQuoteMessages = quoteMessageNodes.map((x)=>x.innerHTML.trim()).filter((x) => !x);
        if (emptyQuoteMessages.length || quotes.length !== quoteMessageNodes.length) this.addError(this.getLabel("Missing one or more quote messages"));

        // Quote text
        let quoteAuthorNodes = Array.from(this.newsItem.querySelectorAll('object[type="fdmg/quote"] author'));
        let emptyQuoteAuthors = quoteAuthorNodes.map((x)=>x.innerHTML.trim()).filter((x) => !x);
        if (emptyQuoteAuthors.length || quotes.length !== quoteAuthorNodes.length) this.addError(this.getLabel("Missing one or more quote sources"));
      }
    }
  }
}

export default QuoteValidator
