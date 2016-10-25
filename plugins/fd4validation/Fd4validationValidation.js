module.exports = {

  isValid: function(newsItem) {
    const pubStatus = getPubStatus(this.context.api.getPubStatus())
    const accumulator = MessageAccumulator()

    // TODO text length maybe?

    const authors = newsItem.querySelectorAll('itemMeta>links link[type="x-im/author"]')
    if (authors.length < 1) {
      accumulator.addAuto(this.context.i18n.t('Missing author'), pubStatus)
    }

    const headline = newsItem.querySelectorAll('idf>group element[type="headline"]')
    if (headline.length < 1 || headline[0].innerHTML.trim() == '') {
      accumulator.addAuto(this.context.i18n.t('Missing headline'), pubStatus)
    } else if (headline.length > 1) {
      accumulator.addError(this.context.i18n.t('Too many headlines'))
    }

    const teaser = newsItem.querySelectorAll('contentMeta>metadata object[type="x-im/teaser"]')
    if (teaser.length != 1) {
      if (pubStatus == PUBLISH) {
        accumulator.addError(this.context.i18n.t('Missing teaser'))
      }
    } else {
      const title = teaser[0].attributes.getNamedItem('title')
      if (title == null || title.value.trim() == '') {
        if (pubStatus == PUBLISH) {
          accumulator.addError(this.context.i18n.t('Missing teaser title'))
        }
      }

      const body = teaser[0].querySelectorAll('data>text')
      if (body.length != 1 || body[0].innerHTML.trim() == '') {
        if (pubStatus == PUBLISH) {
          accumulator.addError(this.context.i18n.t('Missing teaser body'))
        }
      }
    }

    const section = newsItem.querySelectorAll('itemMeta>links link[type="fdmg/section"]')
    if (section.length != 1) {
      accumulator.addAuto(this.context.i18n.t('Missing section'))
    }

    const tags = newsItem.querySelectorAll('itemMeta>links link[type="x-im/category"]')
    if (tags.length < 1) {
      if (pubStatus == PUBLISH) {
        accumulator.addError(this.context.i18n.t('Missing tags'))
      }
    }

    const body = newsItem.querySelectorAll('idf>group element[type="body"]')
    if (body == null || (body.length == 1 && body[0].innerHTML.trim() == '')) {
      accumulator.addError(this.context.i18n.t('Missing body'))
    }

    return accumulator.read()
  }
}

const DRAFT = 1
const PUBLISH = 2

function getPubStatus(pubStatus) {
  switch (pubStatus.qcode) {
    case 'imext:draft':
    case 'stat:canceled':
      return DRAFT
    case 'imext:done':
    case 'stat:withheld':
    case 'stat:usable':
      return PUBLISH
    default:
      throw new Error(`Unknown pubstatus qcode :'${pubStatus.qcode}'`)
  }
}

function MessageAccumulator() {
  var messages = []

  return {
    addAuto: function(message, pubStatus) {
      if (pubStatus == DRAFT) this.addWarning(message)
      else if (pubStatus == PUBLISH) this.addError(message)
    },

    addWarning: function(message) {
      messages.push({ message, type: 'warning' })
    },

    addError: function(message) {
      messages.push({ message, type: 'error' })
    },

    read: function() {
      return messages
    }
  }
}
