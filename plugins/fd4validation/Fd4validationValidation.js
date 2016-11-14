/*

 ,_,
(0,0)
(   )
-"-"-

*/

const $ = require('substance/util/jquery')

const emptyBody = (x) => x.length == 0 || !x[0] || x[0].innerHTML.trim() == ''
const emptyTitle = (x) => x.length == 0 || !x[0] || x[0].value.trim() == ''
const moreThanOne = (x) => x.length > 1
const lessThanOne = (x) => x.length < 1
const exactlyOne = (x) => x.length == 1
const isUnderRange = (x) => x[0].classList.contains('under-range')
const isOverRange = (x) => x[0].classList.contains('over-range')
const atLeastOne = (x) => x.length >= 1
const isValidFd4Url = (x) => (/^.*fd\.nl.*\/(\d+).*$/i).test(x)

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
    const charcount = $('#fd4validation-character-count')
    const section = newsItem.querySelectorAll('itemMeta>links link[type="fdmg/section"]')

    const tags = newsItem.querySelectorAll('itemMeta>links link[type="x-im/category"]')

    const relatedarticles = Array.from(newsItem.querySelectorAll('itemMeta>links link[type="fdmg/relatedarticle"]').values())
      .map((x) => x.attributes.getNamedItem('url'))
      .filter((x) => !!x)
      .map((x) => x.value)

    if (emptyBody(headline) && (submitting || publishing)) acc.addError(this.context.i18n.t('Missing headline'))
    if (moreThanOne(headline) && (submitting || publishing)) acc.addError(this.context.i18n.t('More than one headline'))

    if (lessThanOne(author)) acc.addError(this.context.i18n.t('Missing author'))

    if (!exactlyOne(teaser)) acc.addError(this.context.i18n.t('Missing teaser block'))
    if (moreThanOne(teaser)) acc.addError(this.context.i18n.t('Too many teaser blocks'))
    if (exactlyOne(teaser) && emptyTitle(teasertitle) && publishing) acc.addError(this.context.i18n.t('Missing teaser title'))
    if (exactlyOne(teaser) && emptyBody(teaserbody) && publishing) acc.addError(this.context.i18n.t('Missing teaser body'))

    if (!exactlyOne(textcount) && publishing) acc.addError(this.context.i18n.t('Missing text length'))
    if (exactlyOne(textcount) && exactlyOne(charcount) && isUnderRange(charcount) && (submitting || publishing)) acc.addWarning(this.context.i18n.t('Not enough characters'))
    if (exactlyOne(textcount) && exactlyOne(charcount) && isOverRange(charcount) && (submitting || publishing)) acc.addWarning(this.context.i18n.t('Too many characters'))

    if (!exactlyOne(section)) acc.addError(this.context.i18n.t('Missing section'))

    if (lessThanOne(tags) && publishing) acc.addError(this.context.i18n.t('Missings tags'))

    if (atLeastOne(relatedarticles) && !relatedarticles.every(isValidFd4Url) && (drafting || submitting)) acc.addWarning(this.context.i18n.t('Invalid related article url'))
    if (atLeastOne(relatedarticles) && !relatedarticles.every(isValidFd4Url) && publishing) acc.addWarning(this.context.i18n.t('Invalid related article url'))


    // Validate HTML Embed
    const htmlEmbed = newsItem.querySelectorAll('object[type="fdmg/htmlembed"]');
    if ((submitting || publishing) && htmlEmbed.length) {

      // HTML Embed text
      let htmlEmbedNodes = Array.from(newsItem.querySelectorAll('object[type="fdmg/htmlembed"] text'));
      let emptyHtmlEmbeds = htmlEmbedNodes.map((x)=>x.innerHTML.trim()).filter((x) => !x || x == "<![CDATA[]]>");
      if (emptyHtmlEmbeds.length || htmlEmbed.length !== htmlEmbedNodes.length) acc.addError(this.context.i18n.t("There are one or more empty HTML-embeds"));

    }

    // Validate Topstory
    const topstory = Array.from(newsItem.querySelectorAll('itemMeta>links link[type="fdmg/topstory"]').values())
      .map((x) => x.attributes.getNamedItem('checked'))
      .filter((x) => !!x)
      .map((x) => x.value)

    if ((drafting || submitting || publishing) && topstory == 'true') {
      const topstoryInputValue = $('#topstory').val();
      if (topstoryInputValue == "" ) acc.addError(this.context.i18n.t("Topstory input value is empty"))
    }

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

    // Validate Images
    const images = newsItem.querySelectorAll('object[type="x-im/image"]');
    if ((submitting || publishing) && images.length) {

      // Image Credit
      let imageCreditsNodes = Array.from(newsItem.querySelectorAll('object[type="x-im/image"] credit'));
      let emptyImageCaptions = imageCreditsNodes.map((x)=>x.innerHTML.trim()).filter((x) => !x);
      if (emptyImageCaptions.length || images.length !== imageCreditsNodes.length) acc.addError(this.context.i18n.t("Missing one or more image credits"));

    }

    return acc.read()
  }
}



/*
const $ = require('substance/util/jquery');

module.exports = {

  isValid: function(newsItem) {
    const pubStatus = getPubStatus(this.context.api.getPubStatus())
    const accumulator = MessageAccumulator()

    const authors = newsItem.querySelectorAll('itemMeta>links link[type="x-im/author"]')
    if (authors.length < 1) {
      accumulator.addAuto(this.context.i18n.t('Missing author'), pubStatus)
    }

    const headline = newsItem.querySelectorAll('idf>group element[type="headline"]')
    if (headline.length < 1 || headline[0].innerHTML.trim() == '') {
      accumulator.addAuto(this.context.i18n.t('Missing headline'), pubStatus)
    } else if (headline.length > 1) {
      accumulator.addError(this.context.i18n.t('Too many headlines'))
    }

    const teaser = newsItem.querySelectorAll('contentMeta>metadata object[type="x-im/teaser"]')
    if (teaser.length != 1) {
      if (pubStatus == PUBLISH) {
        accumulator.addError(this.context.i18n.t('Missing teaser'))
      }
    } else {
      const title = teaser[0].attributes.getNamedItem('title')
      if (title == null || title.value.trim() == '') {
        if (pubStatus == PUBLISH) {
          accumulator.addError(this.context.i18n.t('Missing teaser title'))
        }
      }

      const body = teaser[0].querySelectorAll('data>text')
      if (body.length != 1 || body[0].innerHTML.trim() == '') {
        if (pubStatus == PUBLISH) {
          accumulator.addError(this.context.i18n.t('Missing teaser body'))
        }
      }
    }

    const section = newsItem.querySelectorAll('itemMeta>links link[type="fdmg/section"]')
    if (section.length != 1) {
      accumulator.addAuto(this.context.i18n.t('Missing section'))
    }

    const tags = newsItem.querySelectorAll('itemMeta>links link[type="x-im/category"]')
    if (tags.length < 1) {
      if (pubStatus == PUBLISH) {
        accumulator.addError(this.context.i18n.t('Missing tags'))
      }
    }

    const charCount = $('#fd4validation-character-count')
    if (charCount.length == 1) {
      const span = charCount[0]
      if (span.classList.contains('over-range')) {
        if (pubStatus == PUBLISH) {
          accumulator.addWarning(this.context.i18n.t('Too many characters'))
        }
      } else if(span.classList.contains('under-range')) {
        if (pubStatus == PUBLISH) {
          accumulator.addWarning(this.context.i18n.t('Not enough characters'))
        }
      }
    }

    const relatedarticles = Array.from(newsItem.querySelectorAll('itemMeta>links link[type="fdmg/relatedarticle"]').values())
    if (!relatedarticles
      .map((l) => l.attributes.getNamedItem('url'))
      .filter((x) => !!x)
      .map((u) => u.value)
      .every((u) => (/^.*fd\.nl.*\/(\d+).*$/i).test(u))) {
      accumulator.addError(this.context.i18n.t('Related article containes invalid url'))
    }

    return accumulator.read()
  }
}

const DRAFT = 1
const PUBLISH = 2

function getPubStatus(pubStatus) {
  switch (pubStatus.qcode) {
    case 'imext:draft':
    case 'stat:canceled':
      return DRAFT
    case 'imext:done':
    case 'stat:withheld':
    case 'stat:usable':
      return PUBLISH
    default:
      throw new Error(`Unknown pubstatus qcode :'${pubStatus.qcode}'`)
  }
}

function MessageAccumulator() {
  var messages = []

  return {
    addAuto: function(message, pubStatus) {
      if (pubStatus == DRAFT) this.addWarning(message)
      else if (pubStatus == PUBLISH) this.addError(message)
    },

    addWarning: function(message) {
      messages.push({ message, type: 'warning' })
    },

    addError: function(message) {
      messages.push({ message, type: 'error' })
    },

    read: function() {
      return messages
    }
  }
}
*/
