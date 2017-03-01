import GenreComponent from './GenreComponent';

export default {
  id: 'nl.fdmg.genre',
  name: 'genre',
  configure: function(config) {
    config.addComponentToSidebarWithTabId(this.id, 'main', GenreComponent);

    config.addLabel('Genre', {
      'nl': 'Genre'
    });
    config.addLabel('- no selection -', {
      'nl': '- geen selectie -'
    });
    config.addLabel('free input', {
      'nl': 'vrije invoer'
    });
  }
}
