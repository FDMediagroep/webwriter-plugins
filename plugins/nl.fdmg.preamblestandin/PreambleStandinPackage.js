import PreambleValidator from './PreambleValidator';

export default {
  id: 'nl.fdmg.preamblestandin',
  name: 'preamblestandin',
  configure: function(config) {
    config.addValidator(PreambleValidator);

    config.addLabel('More than one preamble', {
      'nl': 'Artikel mag niet meer dan één inleiding bevatten'
    });
  }
}