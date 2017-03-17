import './scss/writerinfo.scss';
import WriterinfoComponent from './WriterinfoComponent';

export default {
  id: 'nl.fdmg.writerinfo',
  name: 'writerinfo',
  configure: function(config) {
    config.addComponentToSidebarWithTabId(this.id, 'main', WriterinfoComponent);
    config.addLabel('writer-info-button', {
      'nl': 'Instructies/Help'
    });
  }
}