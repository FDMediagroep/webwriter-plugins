import TagsComponent from './TagsComponent'
import TagsValidator from './TagsValidator'

export default {
  id: 'nl.fdmg.tags',
  name: 'tags',
  configure: function(config) {
    config.addComponentToSidebarWithTabId(this.id, 'advancedTab', TagsComponent)

    config.addValidator(TagsValidator)

    config.addLabel('Tags', {
      'nl': 'Tags'
    })

    config.addLabel('Add tag', {
      'nl': 'Tag toevoegen'
    })

    config.addLabel('Remove from article', {
      'nl': 'Verwijder van artikel'
    })

    config.addLabel('Missing tags', {
      'nl': 'Geen tags opgegeven'
    })
  }
}
