import AuthorComponent from './AuthorComponent'

export default {
  id: 'nl.fdmg.author',
  name: 'author',
  configure: function(config) {
    config.addComponentToSidebarWithTabId(this.id, 'main', AuthorComponent)

    config.addLabel('Author', {
      'nl': 'Auteur'
    })

    config.addLabel('Add author', {
      'nl': 'Auteur toevoegen'
    })

    config.addLabel('Remove from article', {
      'nl': 'Verwijder van artikel'
    })
  }
}
