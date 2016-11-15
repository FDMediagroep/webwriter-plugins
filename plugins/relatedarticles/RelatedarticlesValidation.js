module.exports = {
  isValid: function(newsItem) {
    const i18n = this.context.i18n
    const qcode = this.context.api.getPubStatus().qcode
    const drafted = (qcode == 'imext:draft')
    const submitted = (qcode == 'stat:withheld' || qcode == 'imext:done')
    const published = (qcode == 'stat:usable')

    const messages = []

    const relatedarticles = Array.from(newsItem.querySelectorAll('itemMeta > links link[type="fdmg/relatedarticle"]'))

    relatedarticles.forEach((link, i) => {
      const id = link.attributes.getNamedItem('id')

      if (!id || id.value.trim() == '') {
        messages.push({message: `${i18n.t('Related article url is invalid')} (${i + 1})`, type: 'error'})
      }
    })
    return messages
  }
}
