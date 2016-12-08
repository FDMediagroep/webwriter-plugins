import CommentsComponent from './CommentsComponent'

export default {
  id: 'nl.fdmg.comments',
  name: 'comments',
  configure: function(config) {
    // config.addSidebarTab(this.id, 'Related')
    config.addComponentToSidebarWithTabId(this.id, 'main', CommentsComponent)

    config.addLabel('Enable comments', {
      'nl': 'Commentaar inschakelen'
    })
  }
}
