import RedirectLinkComponent from './RedirectLinkComponent';
import RedirectLinkValidator from './RedirectLinkValidator';

export default {
  id: 'nl.fdmg.redirectlink',
  name: 'redirectlink',

  configure: function(config) {
    config.addComponentToSidebarWithTabId(this.id, 'adminTab', RedirectLinkComponent);

    config.addValidator(RedirectLinkValidator);

    config.addLabel('Redirect article', {'nl': 'Redirect artikel'});
    config.addLabel('URL to article', {'nl': 'URL naar artikel (verplicht)'});
    config.addLabel('Redirect link is missing a value', {'nl': 'Redirect artikel URL is niet ingevuld'});
    config.addLabel('Redirect link is not a valid url', {'nl': 'Redirect artikel URL is ongeldig'});

  }
}
