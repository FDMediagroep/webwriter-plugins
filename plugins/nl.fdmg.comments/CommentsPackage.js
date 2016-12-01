import Commentscomponent from './Commentscomponent'

export default {
  id: 'nl.fdmg.comments',
  name: 'comments',
  configure: function(config) {
    // config.addSidebarTab(this.id, 'Related')
    config.addComponentToSidebarWithTabId(this.id, 'main', Commentscomponent)

    config.addLabel('Enable comments', {
      'nl': 'Commentaar inschakelen'
    })
  }
}
