const $ = require('substance/util/jquery')

module.exports = {
  isValid: function(newsItem) {
    const i18n = this.context.i18n
    const qcode = this.context.api.getPubStatus().qcode
    const drafted = (qcode == 'imext:draft')
    const submitted = (qcode == 'stat:withheld' || qcode == 'imext:done')
    const published = (qcode == 'stat:usable')

    const textcount = newsItem.querySelector('itemMeta > links link[type="fdmg/textcount"]')

    const messages = []

    const availableSizes = this.context.api.getConfigValue('textcount', 'sizes', [])

    if (!textcount) {
      messages.push({message: i18n.t('Missing text length'), type: 'error'})
    } else {
      const size = textcount.attributes['size'].value
      if (!!size || !availableSizes.some((s) => size == s.size)) {
        messages.push({message: i18n.t('Missing text length'), type: 'error'})
      }
    }

    if (submitted || published)
    {
      const validatable = $('#textcount-validatable')[0]

      if (validatable.classList.contains('under-range')) {
        messages.push({message: i18n.t('Not enough characters'), type: 'warning'})
      }

      if (validatable.classList.contains('over-range')) {
        messages.push({message: i18n.t('Too many characters'), type: 'warning'})
      }
    }

    return messages
  }
}
