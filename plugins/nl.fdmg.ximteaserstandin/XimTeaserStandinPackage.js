import XimTeaserValidator from './XimTeaserValidator';

export default {
  id: 'nl.fdmg.ximteaserstandin',
  name: 'ximteaserstandin',
  configure: function (config) {
    config.addValidator(XimTeaserValidator)

    config.addLabel('Missing teaser body', {
      'nl': 'Teaser tekst ontbreekt'
    })

    config.addLabel('Missing teaser', {
      'nl': 'Teaser ontbreekt'
    })

    config.addLabel('More than one teaser', {
      'nl': 'Meerdere teasers'
    })
  }
}
