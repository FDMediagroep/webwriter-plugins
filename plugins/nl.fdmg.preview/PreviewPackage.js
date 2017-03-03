import './scss/preview.scss';
import PreviewComponent from './PreviewComponent';

export default {
  id: 'nl.fdmg.preview',
  name: 'preview',
  configure: function (config) {
    config.addComponentToSidebarWithTabId(this.id, 'main', PreviewComponent);
    config.addLabel('Preview', {
      'nl': 'Voorvertoning'
    });
  }
}
