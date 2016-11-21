module.exports = {
  isValid: function(newsItem) {
    const i18n = this.context.i18n
    const qcode = this.context.api.getPubStatus().qcode
    const drafted = (qcode == 'imext:draft')
    const submitted = (qcode == 'stat:withheld' || qcode == 'imext:done')
    const published = (qcode == 'stat:usable')

    const messages = []

    const redirectlink = newsItem.querySelector('itemMeta > links link[type="fdmg/redirectlink"]')

    if (redirectlink.attributes.getNamedItem('checked').value == 'true') {
      const validUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
      const valueItem = redirectlink.attributes.getNamedItem('value')
      const value = valueItem ? valueItem.value : ''

      if (!validUrl.test(value)) {
        messages.push({message: `${i18n.t('Redirect link is not a valid url')}`, type: 'error'})
      }
    }
    return messages
  }
}
