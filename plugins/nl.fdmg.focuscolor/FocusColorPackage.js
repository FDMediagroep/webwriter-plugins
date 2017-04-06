import FocusColorComponent from './FocusColorComponent';

export default {
  id: 'nl.fdmg.focuscolor',
  name: 'focuscolor',

  configure: function(config) {
    config.addComponentToSidebarWithTabId(this.id, 'adminTab', FocusColorComponent);

    config.addLabel('Focus article', {'nl': 'Focus artikel'});
    config.addLabel('Color', {'nl': 'Color (verplicht)'});

  }
}
