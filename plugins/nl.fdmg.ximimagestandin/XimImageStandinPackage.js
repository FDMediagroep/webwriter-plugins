import XimImageValidator from './XimImageValidator';

export default {
  id: 'nl.fdmg.ximimagestandin',
  name: 'ximimagestandin',
  configure: function(config) {
    config.addValidator(XimImageValidator);

    config.addLabel('Image is missing credit', {
      'nl': 'Image credit ontbreekt'
    });
  }
}
