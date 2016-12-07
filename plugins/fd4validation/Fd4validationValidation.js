const emptyBody = (x) => x.length === 0 || !x[0] || x[0].innerHTML.trim() === ''
const emptyTitle = (x) => x.length === 0 || !x[0] || x[0].value.trim() === ''
const moreThanOne = (x) => x.length > 1
const lessThanOne = (x) => x.length < 1
const exactlyOne = (x) => x.length === 1

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
    }())

    const publicationStatus = (function(pubStatus) {
      switch (pubStatus.qcode) {
        case 'imext:draft': return 'draft'
        case 'stat:usable': return 'published'
        case 'stat:withheld': // fallthrough
        case 'imext:done': return 'submitted'
        case 'stat:canceled': return 'deleted'
        default:
          console.log(`Unknown pubstatus qcode: ${pubStatus.qcode}`)
          return 'foobar'
      }
    }(this.context.api.getPubStatus()))

    const publishing = publicationStatus === 'published'
    const submitting = publicationStatus === 'submitted'

    const headline = newsItem.querySelectorAll('idf>group element[type="headline"]')
    const author = newsItem.querySelectorAll('itemMeta>links link[type="x-im/author"]')
    const teaser = newsItem.querySelectorAll('contentMeta>metadata object[type="x-im/teaser"]')
    const teasertitle = teaser.length > 0 ? [teaser[0].attributes.getNamedItem('title')] || [] : []
    const teaserbody = teaser.length > 0 ? teaser[0].querySelectorAll('data>text') : []

    if (emptyBody(headline) && (submitting || publishing)) acc.addError(this.context.i18n.t('Missing headline'))
    if (moreThanOne(headline) && (submitting || publishing)) acc.addError(this.context.i18n.t('More than one headline'))

    if (lessThanOne(author)) acc.addError(this.context.i18n.t('Missing author'))

    if (!exactlyOne(teaser)) acc.addError(this.context.i18n.t('Missing teaser block'))
    if (moreThanOne(teaser)) acc.addError(this.context.i18n.t('Too many teaser blocks'))
    if (exactlyOne(teaser) && emptyTitle(teasertitle) && publishing) acc.addError(this.context.i18n.t('Missing teaser title'))
    if (exactlyOne(teaser) && emptyBody(teaserbody) && publishing) acc.addError(this.context.i18n.t('Missing teaser body'))

    // TODO Extract to htmlembed/HtmlembedValidation.js
    // Validate HTML Embed
    const htmlEmbed = newsItem.querySelectorAll('object[type="fdmg/htmlembed"]');
    if ((submitting || publishing) && htmlEmbed.length) {

      // HTML Embed text
      let htmlEmbedNodes = Array.from(newsItem.querySelectorAll('object[type="fdmg/htmlembed"] text'));
      let emptyHtmlEmbeds = htmlEmbedNodes.map((x)=>x.innerHTML.trim()).filter((x) => !x || x === "<![CDATA[]]>");
      if (emptyHtmlEmbeds.length || htmlEmbed.length !== htmlEmbedNodes.length) acc.addError(this.context.i18n.t("There are one or more empty HTML-embeds"));

    }

    return acc.read()
  }
}
