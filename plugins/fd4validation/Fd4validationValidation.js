const $ = require('substance/util/jquery')

const emptyBody = (x) => x.length == 0 || !x[0] || x[0].innerHTML.trim() == ''
const emptyTitle = (x) => x.length == 0 || !x[0] || x[0].value.trim() == ''
const moreThanOne = (x) => x.length > 1
const lessThanOne = (x) => x.length < 1
const exactlyOne = (x) => x.length == 1
const atLeastOne = (x) => x.length >= 1

module.exports = {
  isValid: function(newsItem) {

    const acc = (function() {
      const messages = []
      return {
        addWarning: function(message) {
          messages.push({message, type: 'warning'})
        },
        addError: function(message) {
          messages.push({message, type: 'error'})
        },
        read: function() {
          return messages
        }
      }
    })()

    const publicationStatus = (function(pubStatus) {
      switch (pubStatus.qcode) {
        case 'imext:draft':   return 'draft'
        case 'stat:usable':   return 'published'
        case 'stat:withheld': // fallthrough
        case 'imext:done':    return 'submitted'
        case 'stat:canceled':    return 'deleted'
        default:
          console.log(`Unknown pubstatus qcode: ${pubStatus.qcode}`)
          return 'foobar'
      }
    })(this.context.api.getPubStatus())

    const drafting = publicationStatus == 'draft'
    const publishing = publicationStatus == 'published'
    const submitting = publicationStatus == 'submitted'

    const headline = newsItem.querySelectorAll('idf>group element[type="headline"]')
    const author = newsItem.querySelectorAll('itemMeta>links link[type="x-im/author"]')
    const teaser = newsItem.querySelectorAll('contentMeta>metadata object[type="x-im/teaser"]')
    const teasertitle = teaser.length > 0 ? [teaser[0].attributes.getNamedItem('title')] || [] : []
    const teaserbody = teaser.length > 0 ? teaser[0].querySelectorAll('data>text') : []
    const textcount = newsItem.querySelectorAll('itemMeta>links link[type="fdmg/textcount"]')
    const section = newsItem.querySelectorAll('itemMeta>links link[type="fdmg/section"]')

    if (emptyBody(headline) && (submitting || publishing)) acc.addError(this.context.i18n.t('Missing headline'))
    if (moreThanOne(headline) && (submitting || publishing)) acc.addError(this.context.i18n.t('More than one headline'))

    if (lessThanOne(author)) acc.addError(this.context.i18n.t('Missing author'))

    if (!exactlyOne(teaser)) acc.addError(this.context.i18n.t('Missing teaser block'))
    if (moreThanOne(teaser)) acc.addError(this.context.i18n.t('Too many teaser blocks'))
    if (exactlyOne(teaser) && emptyTitle(teasertitle) && publishing) acc.addError(this.context.i18n.t('Missing teaser title'))
    if (exactlyOne(teaser) && emptyBody(teaserbody) && publishing) acc.addError(this.context.i18n.t('Missing teaser body'))

    // TODO Extract to section/SectionValidation.js
    if (!exactlyOne(section)) acc.addError(this.context.i18n.t('Missing section'))

    // TODO Extract to htmlembed/HtmlembedValidation.js
    // Validate HTML Embed
    const htmlEmbed = newsItem.querySelectorAll('object[type="fdmg/htmlembed"]');
    if ((submitting || publishing) && htmlEmbed.length) {

      // HTML Embed text
      let htmlEmbedNodes = Array.from(newsItem.querySelectorAll('object[type="fdmg/htmlembed"] text'));
      let emptyHtmlEmbeds = htmlEmbedNodes.map((x)=>x.innerHTML.trim()).filter((x) => !x || x == "<![CDATA[]]>");
      if (emptyHtmlEmbeds.length || htmlEmbed.length !== htmlEmbedNodes.length) acc.addError(this.context.i18n.t("There are one or more empty HTML-embeds"));

    }

    // TODO Extract to topstory/TopstoryValidation.js
    // Validate Topstory
    const topstory = Array.from(newsItem.querySelectorAll('itemMeta>links link[type="fdmg/topstory"]').values())
      .map((x) => x.attributes.getNamedItem('checked'))
      .filter((x) => !!x)
      .map((x) => x.value)

    if ((drafting || submitting || publishing) && topstory == 'true') {
      const topstoryInputValue = $('#topstory').val();
      if (topstoryInputValue == "" ) acc.addError(this.context.i18n.t("Topstory input value is empty"))
    }

    // TODO Extract to quote/QuoteValidation.js
    // Validate Quote
    const quotes = newsItem.querySelectorAll('object[type="fdmg/quote"]');
    if ((submitting || publishing) && quotes.length) {

      // Quote text
      let quoteMessageNodes = Array.from(newsItem.querySelectorAll('object[type="fdmg/quote"] message'));
      let emptyQuoteMessages = quoteMessageNodes.map((x)=>x.innerHTML.trim()).filter((x) => !x);
      if (emptyQuoteMessages.length || quotes.length !== quoteMessageNodes.length) acc.addError(this.context.i18n.t("Missing one or more quote messages"));

      // Quote text
      let quoteAuthorNodes = Array.from(newsItem.querySelectorAll('object[type="fdmg/quote"] author'));
      let emptyQuoteAuthors = quoteAuthorNodes.map((x)=>x.innerHTML.trim()).filter((x) => !x);
      if (emptyQuoteAuthors.length || quotes.length !== quoteAuthorNodes.length) acc.addError(this.context.i18n.t("Missing one or more quote sources"));

    }

    // TODO Extract to stackframe/StackframeValidation.js
    // Validate Stackframe
    const stackFrames = newsItem.querySelectorAll('object[type="fdmg/stackframe"]');
    if ((submitting || publishing) && stackFrames.length) {

      // Textframe title
      let stackFrameHeadingNodes = Array.from(newsItem.querySelectorAll('object[type="fdmg/stackframe"] heading'));
      let emptyStackFrameText = stackFrameHeadingNodes.map((x)=>x.innerHTML.trim()).filter((x) => !x);
      if (emptyStackFrameText.length || stackFrames.length !== stackFrameHeadingNodes.length) acc.addError(this.context.i18n.t("No stackframe heading"));

      // StackFrame text
      let stackFrameContentNodes = Array.from(newsItem.querySelectorAll('object[type="fdmg/stackframe"] content'));
      let emptyStackFrameContent = stackFrameContentNodes.map((x)=>x.innerHTML.trim()).filter((x) => !x);
      if (emptyStackFrameContent.length || stackFrames.length !== stackFrameContentNodes.length) acc.addError(this.context.i18n.t("No stackframe content"));
    }

    // TODO Extract to numberframe/NumberframeValidation.js
    // Validate Numberframe
    const numberFrames = newsItem.querySelectorAll('object[type="fdmg/numberframe"]');
    if ((submitting || publishing) && numberFrames.length) {

      // Textframe title
      let numberFrameHeadingNodes = Array.from(newsItem.querySelectorAll('object[type="fdmg/numberframe"] heading'));
      let emptyNumberFrameHeading = numberFrameHeadingNodes.map((x)=>x.innerHTML.trim()).filter((x) => !x);
      if (emptyNumberFrameHeading.length || numberFrames.length !== numberFrameHeadingNodes.length) acc.addError(this.context.i18n.t("No numberframe heading"));

      // StackFrame text
      let numberFrameContentNodes = Array.from(newsItem.querySelectorAll('object[type="fdmg/numberframe"] content'));
      let emptyStackFrameContent = numberFrameContentNodes.map((x)=>x.innerHTML.trim()).filter((x) => !x);
      if (emptyStackFrameContent.length || numberFrames.length !== numberFrameContentNodes.length) acc.addError(this.context.i18n.t("No numberframe content"));
    }

    // TODO Extract to relatedlink/RelatedlinkValidation.js
    // Validate Related link (uitstapmoment)
    const relatedLinks = newsItem.querySelectorAll('object[type="fdmg/relatedlink"]');
    if ((submitting || publishing) && relatedLinks.length ) {

      // Related link prefix
      let relatedLinksPrefixNodes = Array.from(newsItem.querySelectorAll('object[type="fdmg/relatedlink"] prefix'));
      let emptyRelatedLinksPrefix = relatedLinksPrefixNodes.map((x)=>x.innerHTML.trim()).filter((x) => !x);
      if (emptyRelatedLinksPrefix.length || relatedLinks.length !== relatedLinksPrefixNodes.length) acc.addError(this.context.i18n.t("No relatedlink prefix"));

      // Related link leadtext
      let relatedLinksLeadTextNodes = Array.from(newsItem.querySelectorAll('object[type="fdmg/relatedlink"] leadtext'));
      let emptyRelatedLinksLeadTexts = relatedLinksLeadTextNodes.map((x)=>x.innerHTML.trim()).filter((x) => !x);
      if (emptyRelatedLinksLeadTexts.length || relatedLinks.length !== relatedLinksLeadTextNodes.length) acc.addError(this.context.i18n.t("No relatedlink leadtext"));

      // Related link related url
      let relatedLinksRelatedUrlNodes = Array.from(newsItem.querySelectorAll('object[type="fdmg/relatedlink"] relatedurl'));
      let emptyRelatedLinksRelatedUrls = relatedLinksRelatedUrlNodes.map((x)=>x.innerHTML.trim()).filter((x) => !x);
      if (emptyRelatedLinksRelatedUrls.length || relatedLinks.length !== relatedLinksRelatedUrlNodes.length) acc.addError(this.context.i18n.t("No relatedlink relatedurl"));
    }

    return acc.read()
  }
}
