import HeadlineValidator from './HeadlineValidator';

export default {
  id: 'nl.fdmg.headlinestandin',
  name: 'headlinestandin',
  configure: function (config) {
    config.addValidator(HeadlineValidator);

    config.addLabel('Missing headline', {
      'nl': 'Kop ontbreekt'
    });

    config.addLabel('More than one headline', {
      'nl': 'Artikel mag niet meer dan één kop bevatten'
    });
  }
}
