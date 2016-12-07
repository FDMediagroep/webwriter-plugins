import TagsComponent from './TagsComponent'

export default {
  id: 'nl.fdmg.tags',
  name: 'tags',
  configure: function(config) {
    config.addComponentToSidebarWithTabId(this.id, 'main', TagsComponent)

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
