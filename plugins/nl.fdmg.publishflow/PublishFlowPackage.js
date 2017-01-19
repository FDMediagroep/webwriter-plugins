import PublishFlowComponent from './PublishFlowComponent';

export default {
  name: 'publishflow',
  id: 'nl.fdmg.publishflow',
  index: 100,
  configure: function (config) {
    config.addPopover(
      this.id + '_1',
      {
        icon: 'fa-ellipsis-h',
        button: 'Save',
        align: 'right'
      },
      PublishFlowComponent
    );

    config.addLabel('Save', {
      nl: 'Opslaan',
      sv: 'Spara'
    });

    config.addLabel('Save *', {
      nl: 'Opslaan *',
      sv: 'Spara *'
    });

    config.addLabel('Cancel', {
      nl: 'Annuleren',
      sv: 'Avbryt'
    });

    config.addLabel('From', {
      nl: 'Op'
    });

    config.addLabel('Publish article?', {
      nl: 'Artikel publiceren?',
      sv: 'Publicera artikeln?'
    });

    config.addLabel('This article is currently an unpublished draft', {
      nl: 'Dit artikel staat momenteel in concept',
      sv: 'Den här artikeln är ett ej publicerat utkast'
    });

    config.addLabel('Article is currently pending approval', {
      nl: 'Dit artikel staat op Laatste Nieuws',
      sv: 'Artikeln väntar på godkännande'
    });

    config.addLabel('Scheduled', {
      nl: 'Ingepland',
      sv: 'Schemalagd'
    });

    config.addLabel('Article is scheduled to be published', {
      nl: 'Artikel is ingepland voor publicatie',
      sv: 'Artiklen är schemalagd för publicering'
    });

    config.addLabel('Republish article?', {
      nl: 'Herpubliceer artikel?',
      sv: 'Ompublicera artikeln?'
    });

    config.addLabel('Article was published', {
      nl: 'Artikel is gepubliceerd',
      sv: 'Artikeln publicerades'
    });

    config.addLabel('Publish article again?', {
      nl: 'Artikel opnieuw publiceren?',
      sv: 'Publicera artikeln igen?'
    });

    config.addLabel('Article has been canceled and is no longer published', {
      nl: 'Artikel is verwijderd en is niet langer gepubliceerd',
      sv: 'Artikeln har blivit avpublicerad och är ej längre publicerad'
    });

    config.addLabel('Unknown state', {
      nl: 'Onbekende status',
      sv: 'Okänd status'
    });

    config.addLabel('This article has an unknown, unsupported, status', {
      nl: 'Dit artikel heeft een onbekende en niet ondersteunde status',
      sv: 'Artikeln har en okänd eller felaktig status'
    });

    config.addLabel('Save as draft', {
      nl: 'Opslaan als concept',
      sv: 'Spara som utkast'
    });

    config.addLabel('Ready for approval', {
      nl: 'Submitted/Laatste Nieuws',
      sv: 'Redo för godkännande'
    });

    config.addLabel('Schedule for publish', {
      nl: 'Tijdklok',
      sv: 'Schemalägg publicering'
    });

    config.addLabel('Republish article', {
      nl: 'Herpubliceer artikel',
      sv: 'Ompublicera artikeln'
    });

    config.addLabel('Publish article', {
      nl: 'Publiceer artikel',
      sv: 'Publicera artikeln'
    });

    config.addLabel('Unpublish article', {
      nl: 'Verwijder artikel',
      sv: 'Avpublicera artikeln'
    });

    config.addLabel('imext:draft', {
      nl: 'Concept',
      en: 'Draft',
      sv: 'Utkast'
    });

    config.addLabel('imext:done', {
      nl: 'Submitted/Laatste nieuws',
      en: 'Ready for approval',
      sv: 'Redo för godkännande'
    });

    config.addLabel('stat:withheld', {
      nl: 'Ingepland voor publicatie',
      en: 'Scheduled for publication',
      sv: 'Schemalagd för publicering'
    });

    config.addLabel('stat:usable', {
      nl: 'Gepubliceerd',
      en: 'Published',
      sv: 'Publicerad'
    });

    config.addLabel('stat:canceled', {
      nl: 'Verwijderd',
      en: 'Unpublished',
      sv: 'Avpublicerad'
    });
  }
}
