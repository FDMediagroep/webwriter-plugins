import FDValidator from '../nl.fdmg.fdvalidator/FDValidator'

class RelatedLinkValidator extends FDValidator {
  validate() {
    if (this.isShortArticle || this.isAdvertorial || this.isEvents || this.isRedirectArticle) return

    if (this.submitted || this.published) {
      const relatedLinks = this.newsItem.querySelectorAll('object[type="fdmg/relatedlink"]');

      if ((this.submitted || this.published) && relatedLinks.length ) {

        // Related link prefix
        let relatedLinksPrefixNodes = Array.from(this.newsItem.querySelectorAll('object[type="fdmg/relatedlink"] prefix'));
        let emptyRelatedLinksPrefix = relatedLinksPrefixNodes.map((x)=>x.innerHTML.trim()).filter((x) => !x);
        if (emptyRelatedLinksPrefix.length || relatedLinks.length !== relatedLinksPrefixNodes.length) this.addError(this.getLabel("No relatedlink prefix"));

        // Related link leadtext
        let relatedLinksLeadTextNodes = Array.from(this.newsItem.querySelectorAll('object[type="fdmg/relatedlink"] leadtext'));
        let emptyRelatedLinksLeadTexts = relatedLinksLeadTextNodes.map((x)=>x.innerHTML.trim()).filter((x) => !x);
        if (emptyRelatedLinksLeadTexts.length || relatedLinks.length !== relatedLinksLeadTextNodes.length) this.addError(this.getLabel("No relatedlink leadtext"));

        // Related link related url
        let relatedLinksRelatedUrlNodes = Array.from(this.newsItem.querySelectorAll('object[type="fdmg/relatedlink"] relatedurl'));
        let emptyRelatedLinksRelatedUrls = relatedLinksRelatedUrlNodes.map((x)=>x.innerHTML.trim()).filter((x) => !x);
        if (emptyRelatedLinksRelatedUrls.length || relatedLinks.length !== relatedLinksRelatedUrlNodes.length) this.addError(this.getLabel("No relatedlink relatedurl"));
      }
    }
  }
}

export default RelatedLinkValidator
