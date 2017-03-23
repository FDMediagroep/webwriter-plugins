import './scss/writerinfo.scss';
import WriterinfoComponent from './WriterinfoComponent';

export default {
  id: 'nl.fdmg.writerinfo',
  name: 'writerinfo',
  configure: function(config) {
    config.addComponentToSidebarWithTabId(this.id, 'main', WriterinfoComponent);
    config.addLabel('writer-info-help-button', {
      'nl': 'Instructies/Help'
    });
    config.addLabel('writer-info-hotline-button', {
      'nl': 'Noodnummer: '
    });
  }
}