import AuthorComponent from './AuthorComponent'

export default {
  id: 'nl.fdmg.author',
  name: 'author',
  configure: function(config) {
    config.addComponentToSidebarWithTabId(this.id, 'main', AuthorComponent)

  }
}
