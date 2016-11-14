'use strict'

module.exports = {
  isValid: function (newsItem) {

    const i18n = this.context.i18n
    const qcode = this.context.api.getPubStatus().qcode
    const drafted = (qcode == 'imext:draft')
    const submitted = (qcode == 'stat:withheld' || qcode == 'imext:done')
    const published = (qcode == 'stat:usable')

    if (published) {

      const tags = Array.from(newsItem.querySelectorAll('itemMeta > links link[type="x-im/category"]'))

      if (tags.length <= 0) {
        return [{
          message: i18n.t('Missing tags'),
          type: 'warning'
        }]
      }

      return []
    }
  }
}
