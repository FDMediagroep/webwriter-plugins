module.exports = {

  isValid: function(newsItem) {
    const pubStatus = this.context.api.getPubStatus()
    const section = newsItem.querySelectorAll('itemMeta>links link[type="fdmg/section"]')
    const messages = []

    if (section.length == 0) {
      messages.push({
        type: getMessageType(pubStatus),
        message: this.context.i18n.t(`Missing section`)
      });
    }
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
