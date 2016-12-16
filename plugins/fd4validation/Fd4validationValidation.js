const emptyBody = (x) => x.length === 0 || !x[0] || x[0].innerHTML.trim() === ''
const moreThanOne = (x) => x.length > 1

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

    if (emptyBody(headline) && (submitting || publishing)) acc.addError(this.context.i18n.t('Missing headline'))
    if (moreThanOne(headline) && (submitting || publishing)) acc.addError(this.context.i18n.t('More than one headline'))

    return acc.read()
  }
}
