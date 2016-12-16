import HeadlineValidator from './HeadlineValidator';

export default {
  id: 'nl.fdmg.headlinestandin',
  name: 'headlinestandin',
  configure: function (config) {
    config.addValidator(HeadlineValidator)

    config.addLabel('Missing headline', {
      'nl': 'Headline ontbreekt'
    })

    config.addLabel('More than one headline', {
      'nl': 'Meerdere headlines'
    })
  }
}
