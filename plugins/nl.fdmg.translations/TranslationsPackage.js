/**
 * This plugin is created with the purpose of overriding translations of plugins created by other sources.
 * When we don't have access to change the translations in the plugins directly then we resort to this plugin.
 * Always prefer Merge Requests to the actual plugin rather than adding translations here.
 */
export default {
  id: 'nl.fdmg.translations',
  name: 'translations',
  configure: function(config) {
    config.addLabel('Insert Teaser', {
      'nl': 'Intro voor de homepage invoegen'
    });
    config.addLabel('Insert PDF document', {
      'nl': 'PDF invoegen'
    });
    config.addLabel('headline.content', {
      'nl': 'Titel'
    });
    config.addLabel('headline', {
      'nl': 'Kop'
    });
    config.addLabel('preamble', {
      'nl': 'Inleiding'
    });
    config.addLabel('preamble.content', {
      'nl': 'Inleiding'
    });
    config.addLabel('Paste or type a link url', {
      'nl': 'Plak of type een url'
    });
    config.addLabel('undo', {
      'nl': 'Ongedaan maken'
    });
    config.addLabel('No suggestions', {
      'nl': 'Geen suggesties'
    });
    config.addLabel('redo', {
      'nl': 'Opnieuw'
    });
    config.addLabel('select-all', {
      'nl': 'Alles selecteren'
    });
    config.addLabel('subheadline', {
      'nl': 'Tussenkop'
    });
    config.addLabel('subheadline.content', {
      'nl': 'Tussenkop'
    });
    config.addLabel('paragraph', {
      'nl': 'Alinea'
    });
    config.addLabel('paragraph.content', {
      'nl': 'Alinea'
    });
    config.addLabel('A teaser already exist', {
      'nl': 'Er bestaat al een intro voor de homepage'
    });
    config.addLabel('There is already a teaser in this document', {
      'nl': 'Er bestaat al een intro voor de homepage in dit document'
    });
    config.addLabel('Remove', {
      'nl': 'Verwijderen'
    });
    config.addLabel('ok', {
      'nl': 'OK'
    });
    config.addLabel('Meta', {
      'nl': 'Basis'
    });
    config.addLabel('cancel', {
      'nl': 'Annuleren'
    });
    config.addLabel('continue', {
      'nl': 'Doorgaan'
    });
    config.addLabel('remove-image-button-title', {
      'nl': 'Afbeelding verwijderen'
    });
    config.addLabel('Create strong', {
      'nl': 'Vet'
    });
    config.addLabel('Create emphasis', {
      'nl': 'Cursief'
    });
    config.addLabel('Create link', {
      'nl': 'Link creëren'
    });
    config.addLabel('Delete link', {
      'nl': 'Link verwijderen'
    });
    config.addLabel('delete-link', {
      'nl': 'Link verwijderen'
    });
    config.addLabel('open-link', {
      'nl': 'URL openen'
    })
    config.addLabel('ALT+k to edit', {
      'nl': 'ALT+K om te bewerken'
    })
    config.addLabel('delete-link', {
      'nl': 'URL verwijderen'
    })
    config.addLabel('Rechts uitlijnend', {
      'nl': 'Afbeelding rechts uitlijnend'
    });
    config.addLabel('Volledige breedte', {
      'nl': 'Afbeelding volledige breedte'
    });
  }
}