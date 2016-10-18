module.exports = {

  isValid: function(newsItem) {

    const pubStatus = this.context.api.getPubStatus()
    const warnOnDraftErrorOnPublish = getWarnOnDraftErrorOnPublish(pubStatus)
    const errorOnDraftAndPublish = getErrorOnDraftAndPublish(pubStatus)
    const messages = []

    // TODO Text Length

    // Author+
    const authors = newsItem.querySelectorAll('itemMeta>links link[type="x-im/author"]')
    if (authors.length < 1) {
      messages.push({
        type: warnOnDraftErrorOnPublish,
        message: this.context.i18n.t('Missing author')
      })
    }

    // Headline
    const headline = newsItem.querySelectorAll('idf>group element[type="headline"]')
    if (headline.length < 1) {
      messages.push({
        type: warnOnDraftErrorOnPublish,
        message: this.context.i18n.t('Missing headline')
      })
    }
    if (headline.length > 1) {
      messages.push({
        type: warnOnDraftErrorOnPublish,
        message: this.context.i18n.t('Too many headlines')
      })
    }

    // TODO Body+

    // TODO Teaser Title
    const teaser = newsItem.querySelectorAll('contentMeta>metadata object[type="x-im/teaser"]')
    if (teaser.length != 1) {
      messages.push({
        type: errorOnDraftAndPublish,
        message: this.context.i18n.t('Missing teaser')
      })
    } else {
      const title = teaser[0].attributes.getNamedItem('title')
      if (title == null || title.value.trim() == '') {
        messages.push({
          type: errorOnDraftAndPublish,
          message: this.context.i18n.t('Missing teaser title')
        })
      }

      const body = teaser[0].querySelectorAll('data>text')
      if (body.length != 1 || body[0].innerHTML.trim() == '') {
        messages.push({
          type: errorOnDraftAndPublish,
          message: this.context.i18n.t('Missing teaser body')
        })
      }
    }

    // Section
    const section = newsItem.querySelectorAll('itemMeta>links link[type="fdmg/section"]')
    if (section.length != 1) {
      messages.push({
        type: warnOnDraftErrorOnPublish,
        message: this.context.i18n.t('Missing section')
      })
    }

    // TODO Tags

    return messages
  }
}

function getWarnOnDraftErrorOnPublish(pubStatus) {
  switch (pubStatus.qcode) {
    case 'imext:draft':
    case 'stat:canceled':
      return 'warning'
    case 'imext:done':
    case 'stat:withheld':
    case 'stat:usable':
      return 'error'
    default:
      throw new Error(`Unknown pubstatus qcode :'${pubStatus.qcode}'`)
  }
}

function getErrorOnDraftAndPublish(pubStatus) {
  return 'error'
}
