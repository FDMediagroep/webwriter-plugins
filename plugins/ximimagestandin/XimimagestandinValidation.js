'use strict'

module.exports = {
  isValid: function(newsItem) {
    const i18n = this.context.i18n
    const qcode = this.context.api.getPubStatus().qcode
    const drafted = (qcode == 'imext:draft')
    const submitted = (qcode == 'stat:withheld' || qcode == 'imext:done')
    const published = (qcode == 'stat:usable')

    const messages = []
    if (submitted || published) {
      const images = Array.from(newsItem.querySelectorAll('idf > group object[type="x-im/image"]'))

      images.forEach((im, i) => {

        const credit = im.querySelector('credit')

        if (!credit || credit.innerHTML.trim() == '') {
          messages.push({
            message: `${i18n.t('Image is missing credit')} (${(i + 1)})`,
            type: 'warning'
          })
        }
      })
    }
    return messages
  }
}
