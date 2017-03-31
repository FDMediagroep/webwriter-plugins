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
      'nl': 'Ankeiler op home invoegen'
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
      'nl': 'Er bestaat al een Ankeiler op home'
    });
    config.addLabel('There is already a teaser in this document', {
      'nl': 'Er bestaat al een Ankeiler op home in dit document'
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
    config.addLabel('create-strong', {
      'nl': 'Vet'
    });
    config.addLabel('Create emphasis', {
      'nl': 'Cursief'
    });
    config.addLabel('create-emphasis', {
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
    // History plugin
    config.addLabel('Unsaved articles found', {
      'nl': 'Niet opgeslagen artikelen gevonden'
    })

    config.addLabel('It looks like there are one or more unsaved articles. Do you want to restore an unsaved article?', {
      'nl': 'Er zijn een of meerdere niet opgeslagen artikelen gevonden. Wil je een niet opgeslagen artikel herstellen?'
    })

    config.addLabel('No thanks, create new article', {
      'nl': 'Nee bedankt, maak een nieuw artikel'
    })

    config.addLabel('Unsaved changes found for this article', {
      'nl': 'Niet opgeslagen veranderingen gevonden voor dit artikel'
    })

    config.addLabel('We found some unsaved changes for this article. Do you want to restore the unsaved changes?', {
      'nl': 'We hebben niet opgeslagen veranderingen gevonden voor dit artikel. Wil je de niet opgeslagen veranderingen herstellen?'
    })

    config.addLabel('Restore unsaved changes', {
      'nl': 'Niet opgeslagen veranderingen herstellen'
    })

    config.addLabel('Restore latest unsaved article', {
      'nl': 'Herstel meest recente niet opgeslagen artikel'
    })

    config.addLabel('No thanks, just open the article', {
      'nl': 'Nee bedankt, open artikel'
    })

    config.addLabel('Show advanced list of changes', {
      'nl': 'Toon geavanceerde lijst met veranderingen'
    })

    config.addLabel('Hide advanced list of changes', {
      'nl': 'Verberg geavanceerde lijst met veranderingen'
    })

    config.addLabel('history-popover-headline', {
      en: 'Change history',
      'nl': 'Geschiedenis'
    })
    config.addLabel('history-popover-description', {
      en: 'Change history for this article.',
      'nl': 'Opgeslagen artikelen'
    })
    config.addLabel('Identical with the current version', {
      'nl': 'Identiek met huidige versie'
    })

    config.addLabel('Clear this version history', {
      'nl': 'Versiegeschiedenis verwijderen'
    })
    config.addLabel('history-remove-all-button', {
      'nl': 'Artikelgeschiedenis verwijderen'
    })
    config.addLabel('Identical with the current version', {
      'nl': 'Identiek met huidige versie'
    })
    config.addLabel('history-remove-all-confirm', {
      'nl': 'Ok, verwijder alle artikelgeschiedenis'
    })
    config.addLabel('error-page-Error', {
      'nl': 'Oops, er is iets misgegaan'
    })
    config.addLabel('error-page-human-readable-404', {
      'nl': 'Het door u opgevraagde artikel kan niet worden gevonden '
    })
    config.addLabel('error-page-error-description', {
      'nl': 'Foutomschrijving: '
    })
    config.addLabel('error-page-status-code', {
      'nl': 'Statuscode: '
    })
    config.addLabel('error-page-status-url', {
      'nl': 'Opgevraagde url: '
    })
    config.addLabel('A problem occurred', {
      'nl': 'Er is een fout opgetreden'
    })
  }
}