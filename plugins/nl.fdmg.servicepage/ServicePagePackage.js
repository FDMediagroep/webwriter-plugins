import ServicePageComponent from './ServicePageComponent';
import ServicePageValidator from './ServicePageValidator';

export default {
  id: 'nl.fdmg.servicepage',
  name: 'servicepage',

  configure: function(config) {
    config.addComponentToSidebarWithTabId(this.id, 'adminTab', ServicePageComponent);
    config.addValidator(ServicePageValidator);


    config.addLabel('Service Page', {nl: 'Service Pagina'});
    config.addLabel('Service Page value missing', {nl: 'Artikel is gemarkeerd als Service Pagina maar geen service pagina geselecteerd'});
  }
}
