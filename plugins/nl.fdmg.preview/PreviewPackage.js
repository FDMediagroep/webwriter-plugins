import './scss/preview.scss';
import PreviewComponent from './PreviewComponent';

export default {
  id: 'nl.fdmg.preview',
  name: 'preview',
  configure: function(config) {
    config.addComponentToSidebarWithTabId(this.id, 'main', PreviewComponent);
    config.addLabel('Preview', {
      'nl': 'Voorvertoning'
    });
    config.addLabel('no-preview-notification-heading', {
      'nl': 'Geen voorvertoning mogelijk'
    });
    config.addLabel('no-preview-notification-text', {
      'nl': 'Artikel heeft nog geen artikel-id. Sla uw artikel eerst op.'
    });
  }
}