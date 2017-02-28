import ServicePageComponent from './ServicePageComponent';
import ServicePageValidator from './ServicePageValidator';

export default {
  id: 'nl.fdmg.servicepage',
  name: 'servicepage',

  configure: function(config) {
    config.addComponentToSidebarWithTabId(this.id, 'adminTab', ServicePageComponent);
    config.addValidator(ServicePageValidator);
    config.addLabel('Service Page', {'nl': 'Servicepagina'});
    config.addLabel('Service Page value missing', {'nl': 'Artikel is gemarkeerd als Service Pagina maar er is geen service pagina geselecteerd'});
  }
}
