import DoNotIndexComponent from './DoNotIndexComponent';

export default {
  id: 'nl.fdmg.donotindex',
  name: 'donotindex',
  configure: function(config) {
    config.addComponentToSidebarWithTabId(this.id, 'adminTab', DoNotIndexComponent);

    config.addLabel('Do not index', {
      'nl': 'Artikel niet indexeren'
    });
  }
}
