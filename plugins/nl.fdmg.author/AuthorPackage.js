import AuthorComponent from './AuthorComponent'
import AuthorValidator from './AuthorValidator'

export default {
  id: 'nl.fdmg.author',
  name: 'author',
  configure: function(config) {
    config.addComponentToSidebarWithTabId(this.id, 'main', AuthorComponent)

    config.addValidator(AuthorValidator)

    config.addLabel('Author', {
      'nl': 'Auteur'
    })

    config.addLabel('Add author', {
      'nl': 'Auteur toevoegen'
    })

    config.addLabel('Remove from article', {
      'nl': 'Verwijder van artikel'
    })

    config.addLabel('Missing author', {
      'nl': 'Auteur is leeg'
    })
  }
}
