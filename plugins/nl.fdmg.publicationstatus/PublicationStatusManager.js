const {api, moment} = writer
class PublishFlowConfiguration {
  constructor(pluginId) {
    this.pluginId = pluginId

    this.status = {
      'imext:draft': {
        'allowed': [
          'imext:done',
          'stat:usable',
          'stat:withheld',
          'stat:canceled'
        ],
      },
      'imext:done': {
        'allowed': [
          'stat:usable',
          'imext:draft',
          'stat:withheld',
          'stat:canceled'
        ]
      },
      'stat:withheld': {
        'allowed': [
          'stat:withheld',
          'stat:usable',
          'stat:canceled',
          'imext:draft'
        ]
      },
      'stat:usable': {
        'allowed': [
          'stat:usable',
          'imext:draft',
          'stat:canceled',
        ]
      },
      'stat:canceled': {
        'allowed': [
          'imext:draft',
          'imext:done',
          'stat:usable',
          'stat:withheld',
        ]
      }
    }
  }

  getAllowedActions(status) {
    if (this.status[status]) {
      return this.status[status].allowed
    }

    return []
  }

  setToDraft() {
    this.setStatus('imext:draft', null, null)
  }

  setToDone() {
    this.setStatus('imext:done', null, null)
  }

  setToWithheld(from) {
    let fromObj = moment(from);

    if (!fromObj.isValid()) {
      throw new Error('Invalid from date and time')
    }

    this.setStatus(
      'stat:withheld',
      {value: fromObj.format('YYYY-MM-DDTHH:mm:ssZ')}
    )
  }

  setToUsable() {
    this.setStatus(
      'stat:usable',
      {value: moment().format('YYYY-MM-DDTHH:mm:ssZ')},
      null
    )
  }

  setToCanceled() {
    this.setStatus('stat:canceled', null, null)
  }

  setStatus(qcode, pubStart) {
    if (qcode) {
      api.newsItem.setPubStatus(
        this.pluginId,
        {
          qcode: qcode
        }
      )
    }

    if (pubStart === null) {
      api.newsItem.removePubStart(this.pluginId)
    }
    else if (typeof pubStart !== 'undefined') {
      api.newsItem.setPubStart(this.pluginId, pubStart)
    }

  }
}

export default PublishFlowConfiguration
