module.exports = {

  isValid: function(newsItem) {

    const pubStatus = this.context.api.getPubStatus()
    const messages = []

    // TODO Text Length

    // Author+
    const authors = newsItem.querySelectorAll('itemMeta>links link[type="x-im/author"]')
    if (authors.length < 1) {
      messages.push({
        type: getMessageType(pubStatus),
        message: this.context.i18n.t('Missing author')
      })
    }

    // TODO Headline

    // TODO Body+

    // TODO Teaser Title
    // TODO Teaser Body

    // Section
    const section = newsItem.querySelectorAll('itemMeta>links link[type="fdmg/section"]')
    if (section.length != 1) {
      messages.push({
        type: getMessageType(pubStatus),
        message: this.context.i18n.t('Missing section')
      })
    }

    // TODO Tags

    return messages
  }
}

function getMessageType(pubStatus) {
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
