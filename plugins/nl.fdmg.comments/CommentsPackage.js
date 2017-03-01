import CommentsComponent from './CommentsComponent';

export default {
  id: 'nl.fdmg.comments',
  name: 'comments',
  configure: function(config) {
    config.addComponentToSidebarWithTabId(this.id, 'adminTab', CommentsComponent);

    config.addLabel('Enable comments', {
      'nl': 'Commentaar inschakelen'
    });
  }
}
